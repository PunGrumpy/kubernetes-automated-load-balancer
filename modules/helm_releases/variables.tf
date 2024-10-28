variable "cloudflare_email" {
  type = string
}

variable "cloudflare_api_key" {
  type = string
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

variable "environment" {
  description = "Environment name (e.g., prod, staging)"
  type        = string
  default     = "prod"

  validation {
    condition     = contains(["prod", "staging", "dev"], var.environment)
    error_message = "Environment must be one of: prod, staging, dev."
  }
}
