module "helm_releases" {
  source             = "./modules/helm_releases"
  cloudflare_email   = var.cloudflare_email
  cloudflare_api_key = var.cloudflare_api_key
}
