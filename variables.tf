variable "server_ip" {
  description = "IP address of the K3s server"
  type        = string
  sensitive   = true
}

variable "ssh_user" {
  description = "SSH username for K3s server"
  type        = string
}

variable "ssh_private_key" {
  description = "Path to SSH private key"
  type        = string
  sensitive   = true
}

variable "kube_config_path" {
  description = "Path to kubeconfig file"
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
  sensitive   = true
}

variable "cloudflare_api_key" {
  description = "Cloudflare API key"
  type        = string
  sensitive   = true
}

variable "environment" {
  description = "Environment name (e.g., prod, staging)"
  type        = string
  default     = "prod"

  validation {
    condition     = contains(["prod", "staging", "dev"], var.environment)
    error_message = "Environment must be one of: prod, staging, dev."
  }
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
