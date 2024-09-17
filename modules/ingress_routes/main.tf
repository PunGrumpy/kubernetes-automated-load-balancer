resource "kubectl_manifest" "argocd_ingress_route" {
  yaml_body = templatefile("${path.module}/templates/ingress-route.yaml", {
    name          = "argocd-server"
    namespace     = "argocd"
    domain        = var.argocd_domain
    service_name  = "argocd-server"
    service_port  = 80
    cert_resolver = "cloudflare"
  })
}

resource "kubectl_manifest" "grafana_ingress_route" {
  yaml_body = templatefile("${path.module}/templates/ingress-route.yaml", {
    name          = "grafana"
    namespace     = "monitoring"
    domain        = var.grafana_domain
    service_name  = "grafana"
    service_port  = 80
    cert_resolver = "cloudflare"
  })
}
