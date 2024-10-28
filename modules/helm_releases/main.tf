resource "kubernetes_namespace" "traefik" {
  metadata {
    name = "traefik"
    labels = {
      "environment" = var.environment
    }
  }
}

resource "kubernetes_secret" "cloudflare_secret" {
  metadata {
    name      = "cloudflare-secret"
    namespace = kubernetes_namespace.traefik.metadata[0].name
  }

  data = {
    CLOUDFLARE_EMAIL  = var.cloudflare_email
    CLOUDFLARE_APIKEY = var.cloudflare_api_key
  }

  type = "Opaque"
}

resource "helm_release" "traefik" {
  name       = "traefik"
  repository = "https://helm.traefik.io/traefik"
  chart      = "traefik"
  namespace  = kubernetes_namespace.traefik.metadata[0].name
  version    = "10.24.0"

  values = [
    templatefile("${path.module}/values/traefik.yml", {
      cloudflare_email = var.cloudflare_email
    })
  ]

  depends_on = [kubernetes_secret.cloudflare_secret]
}

resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  namespace  = "argocd"
  version    = "5.46.0"

  values = [
    templatefile("${path.module}/values/argocd.yml", {
      domain = var.argocd_domain
    })
  ]

  create_namespace = true
}

resource "kubernetes_secret" "argocd_password" {
  depends_on = [helm_release.argocd]

  metadata {
    name      = "argocd-initial-admin-secret"
    namespace = "argocd"
  }

  data = {
    password = base64encode("admin")
  }

  type = "Opaque"
}

resource "helm_release" "prometheus" {
  name       = "prometheus"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = "monitoring"
  version    = "51.0.0"

  values = [file("${path.module}/values/prometheus.yml")]

  create_namespace = true
}

resource "helm_release" "grafana" {
  name       = "grafana"
  repository = "https://grafana.github.io/helm-charts"
  chart      = "grafana"
  namespace  = "monitoring"
  version    = "6.60.0"

  values = [
    templatefile("${path.module}/values/grafana.yml", {
      domain = var.grafana_domain
    })
  ]

  depends_on = [helm_release.prometheus]
}
