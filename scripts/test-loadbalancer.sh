#!/bin/bash

set -eo pipefail

# Set variables
RELEASE_NAME="k8s-auto-loadbalancer"
FOLDER_NAME="helm"
NAMESPACE="kalb"
DEPLOYMENT_NAME="${RELEASE_NAME}"
SERVICE_NAME="${RELEASE_NAME}"

# Function for logging and error handling
log() { echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"; }
error() {
  log "ERROR: $1"
  exit 1
}

# Function to run kubectl commands with error handling
kube_command() {
  kubectl $@ -n ${NAMESPACE} || error "Failed to execute: kubectl $@"
}

# Function to check deployment status
check_deployment() {
  log "Checking deployment status..."
  kube_command get deployment ${DEPLOYMENT_NAME} -o wide
  kube_command get pods -l app.kubernetes.io/name=k8s-auto-loadbalancer
}

# Clean up previous resources
log "Cleaning up previous resources..."
kubectl delete namespace ${NAMESPACE} --ignore-not-found

# Create namespace
log "Creating namespace..."
kubectl create namespace ${NAMESPACE} || error "Failed to create namespace"

# Test 1: Deployment
log "Test 1: Testing deployment..."
helm install ${RELEASE_NAME} ${FOLDER_NAME} -n ${NAMESPACE} --wait --timeout 5m || error "Helm install failed"
check_deployment

# Test 2: Scaling
log "Test 2: Testing scaling..."
kube_command scale deployment ${DEPLOYMENT_NAME} --replicas=3
kube_command rollout status deployment/${DEPLOYMENT_NAME} --timeout=300s
check_deployment

# Test 3: Load balancing
log "Test 3: Testing load balancing..."
kube_command run -i --rm --restart=Never load-generator --image=busybox -- /bin/sh -c \
  "for i in {1..100}; do wget -qO- http://${SERVICE_NAME} >/dev/null && echo 'Request $i: Success' || echo 'Request $i: Failed'; done"
log "Analyzing load balancing results..."
kube_command logs deployment/${DEPLOYMENT_NAME} --tail=100 | grep "GET /" | awk '{print $1}' | sort | uniq -c

# Test 4: Rolling update
log "Test 4: Testing rolling update..."
log "Current Helm release version:"
helm list -n ${NAMESPACE}
check_deployment

log "Starting Helm upgrade..."
if ! helm upgrade ${RELEASE_NAME} ${FOLDER_NAME} -n ${NAMESPACE} --set image.tag=latest --timeout 10m --wait; then
  log "Helm upgrade failed. Checking deployment status..."
  check_deployment
  kube_command describe deployment ${DEPLOYMENT_NAME}
  error "Helm upgrade failed"
fi

kube_command rollout status deployment/${DEPLOYMENT_NAME} --timeout=300s
check_deployment

# Test 5: Monitoring
log "Test 5: Testing monitoring..."
if kubectl get namespace monitoring &>/dev/null; then
  kubectl port-forward svc/prometheus-server 9090:80 -n monitoring &
  sleep 10
  curl -s http://localhost:9090/api/v1/query?query=up || log "WARNING: Unable to query Prometheus"
  pkill -P $$ # Kill all child processes
else
  log "WARNING: Monitoring namespace not found. Skipping monitoring test."
fi

# Clean up
log "Final cleanup..."
helm uninstall ${RELEASE_NAME} -n ${NAMESPACE} || log "WARNING: Failed to uninstall Helm release"

log "All tests completed."
