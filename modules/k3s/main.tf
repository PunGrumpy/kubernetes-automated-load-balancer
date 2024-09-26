resource "null_resource" "install_k3s" {
  connection {
    type        = "ssh"
    user        = var.ssh_user
    private_key = file(var.ssh_private_key)
    host        = var.server_ip
  }
}

resource "null_resource" "get_kubeconfig" {
  depends_on = [null_resource.install_k3s]

  provisioner "local-exec" {
    command = <<EOT
      scp -i ${var.ssh_private_key} ${var.ssh_user}@${var.server_ip}:/home/${var.ssh_user}/.kube/config ~/.kube/config
      sed -i 's/127.0.0.1/${var.server_ip}/g' ~/.kube/config
    EOT
  }
}
