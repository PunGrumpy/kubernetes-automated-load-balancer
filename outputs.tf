output "argocd_url" {
  description = "URL of the ArgoCD server"
  value       = "https://${var.argocd_domain}"
}

output "grafana_url" {
  description = "URL of the Grafana dashboard"
  value       = "https://${var.grafana_domain}"
}

output "kubeconfig_path" {
  description = "Path to kubeconfig file"
  value       = "~/.kube/config"
}

output "argocd_admin_password" {
  description = "ArgoCD admin password"
  value       = module.helm_releases.argocd_admin_password
  sensitive   = true
}
