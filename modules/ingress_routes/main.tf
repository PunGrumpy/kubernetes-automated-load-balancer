resource "kubernetes_manifest" "argocd_ingress_route" {
  manifest = yamldecode(templatefile("${path.module}/templates/ingress-route.yml", {
    name          = "argocd-server"
    namespace     = "argocd"
    domain        = var.argocd_domain
    service_name  = "argocd-server"
    service_port  = 80
    cert_resolver = "cloudflare"
  }))
}

resource "kubernetes_manifest" "grafana_ingress_route" {
  manifest = yamldecode(templatefile("${path.module}/templates/ingress-route.yml", {
    name          = "grafana"
    namespace     = "monitoring"
    domain        = var.grafana_domain
    service_name  = "grafana"
    service_port  = 80
    cert_resolver = "cloudflare"
  }))
}
