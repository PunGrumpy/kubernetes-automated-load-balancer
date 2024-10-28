#!/bin/bash
set -e

# Install K3s
curl -sfL https://get.k3s.io | sh -s - server \
  --disable traefik \
  --write-kubeconfig-mode 644 \
  --tls-san ${SERVER_IP}

# Wait for K3s to be ready
until kubectl get node >/dev/null 2>&1; do
  echo "Waiting for K3s to be ready..."
  sleep 5
done

# Install necessary tools
sudo apt-get update
sudo apt-get install -y jq curl