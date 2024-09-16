output "argocd_url" {
  description = "URL of the ArgoCD server"
  value       = "https://${var.argocd_domain}"
}

output "grafana_url" {
  description = "URL of the Grafana dashboard"
  value       = "https://${var.grafana_domain}"
}

output "kubectl_config_command" {
  description = "Command to configure kubectl"
  value       = "export KUBECONFIG=~/.kube/config"
}
