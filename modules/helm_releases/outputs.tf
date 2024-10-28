output "argocd_release_name" {
  description = "Release name of ArgoCD"
  value       = helm_release.argocd.name
}

output "prometheus_release_name" {
  description = "Release name of Prometheus"
  value       = helm_release.prometheus.name
}

output "grafana_release_name" {
  description = "Release name of Grafana"
  value       = helm_release.grafana.name
}

output "traefik_release_name" {
  description = "Release name of Traefik"
  value       = helm_release.traefik.name
}

output "argocd_admin_password" {
  description = "ArgoCD admin password"
  value       = try(kubernetes_secret.argocd_password.data["password"], "")
  sensitive   = true
}
