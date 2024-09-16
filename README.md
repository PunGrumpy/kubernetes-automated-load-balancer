# 🚀 Automated Setup with Terraform

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- 🛠️ [OpenTofu](https://opentofu.org/docs/intro/install/) (v1.6.0 or later)
- ☸️ [kubectl](https://kubernetes.io/docs/tasks/tools/)
- ⚓ [Helm](https://helm.sh/docs/intro/install/)

## 🏗️ Project Setup

1. Clone the repository:

   ```
   git clone https://github.com/your-username/kubernetes-automated-loadbalancer.git
   cd kubernetes-automated-loadbalancer
   ```

2. Copy the example `tofu.tfvars` file and edit it with your values:
   ```
   cp tofu.tfvars.example tofu.tfvars
   ```
   ✏️ Edit `tofu.tfvars` with your server details, SSH key path, and Cloudflare credentials.

## ⚙️ Configuration

1. Review and modify the following files as needed:

   - 📄 `values/argocd.yml`: ArgoCD configuration
   - 📄 `values/traefik.yml`: Traefik configuration
   - 📄 `templates/ingress-route.yaml`: IngressRoute template

2. If you need to add or modify IngressRoutes, edit `ingress-routes.tf`.

## 🚀 Deployment

1. Initialize OpenTofu:

   ```
   tofu init
   ```

2. Preview the changes:

   ```
   tofu plan
   ```

3. Apply the configuration:

   ```
   tofu apply
   ```

4. When prompted, type `yes` to confirm the changes.

## 🌐 Accessing Services

After successful deployment, you can access the services using the following URLs:

- 🔷 ArgoCD: https://argocd.your-domain.com
- 📊 Grafana: https://grafana.your-domain.com (if configured)

Replace `your-domain.com` with the domain you specified in `tofu.tfvars`.

## ➕ Adding New Services

To add a new service with an IngressRoute:

1. Add the service's Helm release in `modules/helm_releases/main.tf`.
2. Create a new IngressRoute in `ingress-routes.tf` using the existing template.
3. Add any necessary variables to `variables.tf` and `tofu.tfvars`.

## 🔧 Troubleshooting

- 🔒 If you encounter issues with SSL certificates, check the Traefik logs and ensure your Cloudflare credentials are correct.
- 🔌 For connection issues, verify that your firewall settings allow traffic on ports 80 and 443.

## 🧹 Cleanup

To remove all created resources:

```
tofu destroy
```

⚠️ **Caution**: This will delete all resources created by this project. Use with care in production environments.

## 🆘 Support

For additional help or to report issues, please open an issue in the GitHub repository.

## 📚 Additional Resources

- 📖 [OpenTofu Documentation](https://opentofu.org/docs/)
- 📘 [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- 📗 [Helm Documentation](https://helm.sh/docs/)
- 📙 [Traefik Documentation](https://doc.traefik.io/traefik/)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
