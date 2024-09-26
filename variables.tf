variable "server_ip" {
  description = "IP address of the server"
  type        = string
}

variable "ssh_user" {
  description = "SSH username"
  type        = string
}

variable "ssh_private_key" {
  description = "Path to SSH private key"
  type        = string
  sensitive   = true
}

variable "kube_config_context" {
  description = "Kubeconfig context"
  type        = string
}

variable "cloudflare_email" {
  description = "Cloudflare account email"
  type        = string
}

variable "cloudflare_api_key" {
  description = "Cloudflare API key"
  type        = string
  sensitive   = true
}

variable "argocd_domain" {
  description = "Domain for ArgoCD"
  type        = string
  default     = "argocd.pungrumpy.xyz"
}

variable "grafana_domain" {
  description = "Domain for Grafana"
  type        = string
  default     = "grafana.pungrumpy.xyz"
}
