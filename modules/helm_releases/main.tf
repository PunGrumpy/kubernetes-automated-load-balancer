resource "kubernetes_namespace" "traefik" {
  metadata {
    name = "traefik"
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

  depends_on = [kubernetes_namespace.traefik]
}

resource "helm_release" "traefik" {
  name             = "traefik"
  repository       = "https://helm.traefik.io/traefik"
  chart            = "traefik"
  namespace        = kubernetes_namespace.traefik.metadata[0].name
  force_update     = true
  reuse_values     = true
  create_namespace = true

  values = [file("${path.module}/values/traefik.yml")]

  depends_on = [kubernetes_secret.cloudflare_secret]
}

resource "helm_release" "argocd" {
  name             = "argocd"
  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  namespace        = "argocd"
  force_update     = true
  reuse_values     = true
  create_namespace = true

  values = [file("${path.module}/values/argocd.yml")]
}


data "kubernetes_secret" "argocd_admin_password" {
  metadata {
    name      = "argocd-initial-admin-secret"
    namespace = helm_release.argocd.namespace
  }

  depends_on = [helm_release.argocd]
}

resource "helm_release" "prometheus" {
  name             = "prometheus"
  repository       = "https://prometheus-community.github.io/helm-charts"
  chart            = "prometheus"
  namespace        = "monitoring"
  force_update     = true
  reuse_values     = true
  create_namespace = true

  values = [file("${path.module}/values/prometheus.yml")]
}

resource "helm_release" "grafana" {
  name             = "grafana"
  repository       = "https://grafana.github.io/helm-charts"
  chart            = "grafana"
  namespace        = "monitoring"
  force_update     = true
  reuse_values     = true
  create_namespace = true

  values = [file("${path.module}/values/grafana.yml")]

  depends_on = [ helm_release.prometheus ]
}
