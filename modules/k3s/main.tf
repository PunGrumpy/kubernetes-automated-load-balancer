resource "null_resource" "install_k3s" {
  connection {
    type        = "ssh"
    user        = var.ssh_user
    private_key = file(var.ssh_private_key)
    host        = var.server_ip
    timeout     = "5m"
  }

  provisioner "remote-exec" {
    inline = [
      "export SERVER_IP=${var.server_ip}",
      "${path.module}/scripts/install_k3s.sh"
    ]
  }
}

resource "null_resource" "get_kubeconfig" {
  depends_on = [null_resource.install_k3s]

  provisioner "local-exec" {
    command = <<-EOT
      mkdir -p ~/.kube
      scp -i ${var.ssh_private_key} ${var.ssh_user}@${var.server_ip}:/etc/rancher/k3s/k3s.yaml ~/.kube/config
      sed -i 's/127.0.0.1/${var.server_ip}/g' ~/.kube/config
      chmod 600 ~/.kube/config
    EOT
  }
}
