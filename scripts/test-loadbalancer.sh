#!/bin/bash

# Set variables
RELEASE_NAME="k8s-auto-loadbalancer"
FOLDER_NAME="../helm"
NAMESPACE="kalb"
DEPLOYMENT_NAME="${RELEASE_NAME}"
SERVICE_NAME="${RELEASE_NAME}"

# Function to check pod status
check_pod_status() {
    kubectl get pods -l app.kubernetes.io/name=k8s-auto-loadbalancer -n ${NAMESPACE}
}

# Function to generate load
generate_load() {
    kubectl run -i --tty load-generator --image=busybox --restart=Never -n ${NAMESPACE} -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://${SERVICE_NAME}; done"
}

# Test 1: Deployment
echo "Testing deployment..."
helm install ${RELEASE_NAME} ${FOLDER_NAME} -n ${NAMESPACE} --wait
check_pod_status

# Test 2: Scaling
echo "Testing scaling..."
kubectl scale deployment ${DEPLOYMENT_NAME} --replicas=3 -n ${NAMESPACE}
kubectl rollout status deployment/${DEPLOYMENT_NAME} -n ${NAMESPACE}
check_pod_status

# Test 3: Load balancing
echo "Testing load balancing..."
generate_load &
sleep 60
kubectl logs deployment/${DEPLOYMENT_NAME} -n ${NAMESPACE} --tail=50

# Test 4: Rolling update
echo "Testing rolling update..."
helm upgrade ${RELEASE_NAME} ${FOLDER_NAME} -n ${NAMESPACE} --set image.tag=new-version --timeout 10m --wait
kubectl rollout status deployment/${DEPLOYMENT_NAME} -n ${NAMESPACE} --timeout=300s

# Test 5: Monitoring
echo "Testing monitoring..."
kubectl port-forward svc/prometheus-server 9090:80 -n monitoring &
sleep 10
curl http://localhost:9090/api/v1/query?query=up

# Clean up
echo "Cleaning up..."
kubectl delete pod load-generator -n ${NAMESPACE} --ignore-not-found
helm uninstall ${RELEASE_NAME} -n ${NAMESPACE}

echo "Tests completed."