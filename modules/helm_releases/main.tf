resource "kubernetes_secret" "cloudflare_secret" {
  metadata {
    name      = "cloudflare-secret"
    namespace = "kube-system"
  }

  data = {
    CLOUDFLARE_EMAIL  = var.cloudflare_email
    CLOUDFLARE_APIKEY = var.cloudflare_api_key
  }

  type = "Opaque"
}

resource "helm_release" "traefik" {
  name             = "traefik"
  repository       = "https://helm.traefik.io/traefik"
  chart            = "traefik"
  namespace        = "kube-system"
  create_namespace = true
  depends_on       = [kubernetes_secret.cloudflare_secret]

  values = [
    file("${path.module}/values/traefik.yml")
  ]
}

resource "helm_release" "argocd" {
  name             = "argocd"
  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  namespace        = "argocd"
  create_namespace = true
  depends_on       = [helm_release.traefik]

  values = [
    file("${path.module}/values/argocd.yml")
  ]
}

resource "helm_release" "prometheus" {
  name             = "prometheus"
  repository       = "https://prometheus-community.github.io/helm-charts"
  chart            = "prometheus"
  namespace        = "monitoring"
  create_namespace = true
}

resource "helm_release" "grafana" {
  name             = "grafana"
  repository       = "https://grafana.github.io/helm-charts"
  chart            = "grafana"
  namespace        = "monitoring"
  create_namespace = true
}
