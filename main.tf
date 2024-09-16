module "server_setup" {
  source          = "./modules/server_setup"
  server_ip       = var.server_ip
  ssh_user        = var.ssh_user
  ssh_private_key = var.ssh_private_key
}

module "k3s" {
  source          = "./modules/k3s"
  depends_on      = [module.server_setup]
  server_ip       = var.server_ip
  ssh_user        = var.ssh_user
  ssh_private_key = var.ssh_private_key
}

module "helm_releases" {
  source     = "./modules/helm_releases"
  depends_on = [module.k3s]
}
