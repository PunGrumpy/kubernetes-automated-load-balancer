output "server_ip" {
  description = "The IP address of the server"
  value       = var.server_ip
}

output "k3s_kubeconfig_path" {
  description = "Path to the local kubeconfig file"
  value       = "~/.kube/config"
}

output "argocd_server_url" {
  description = "URL of the ArgoCD server"
  value       = "https://${var.server_ip}:443"
}

output "grafana_url" {
  description = "URL of the Grafana dashboard"
  value       = "http://${var.server_ip}:80"
}

output "prometheus_url" {
  description = "URL of the Prometheus server"
  value       = "http://${var.server_ip}:9090"
}

output "traefik_dashboard_url" {
  description = "URL of the Traefik dashboard"
  value       = "http://${var.server_ip}:8080"
}

output "kubectl_config_command" {
  description = "Command to configure kubectl"
  value       = "export KUBECONFIG=~/.kube/config"
}
