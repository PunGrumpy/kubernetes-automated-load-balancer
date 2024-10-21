module "k3s" {
  source          = "./modules/k3s"
  server_ip       = var.server_ip
  ssh_user        = var.ssh_user
  ssh_private_key = var.ssh_private_key
}

module "helm_releases" {
  source             = "./modules/helm_releases"
  depends_on         = [module.k3s]
  cloudflare_email   = var.cloudflare_email
  cloudflare_api_key = var.cloudflare_api_key
}

module "ingress_routes" {
  source         = "./modules/ingress_routes"
  depends_on     = [module.helm_releases]
  argocd_domain  = var.argocd_domain
  grafana_domain = var.grafana_domain
}