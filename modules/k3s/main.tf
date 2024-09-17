resource "null_resource" "install_k3s" {
  connection {
    type        = "ssh"
    user        = var.ssh_user
    private_key = file(var.ssh_private_key)
    host        = var.server_ip
  }

  provisioner "remote-exec" {
    script = "${path.module}/../../scripts/install_k3s.sh"
  }
}

resource "null_resource" "get_kubeconfig" {
  depends_on = [null_resource.install_k3s]

  provisioner "local-exec" {
    command = "scp -i ${var.ssh_private_key} ${var.ssh_user}@${var.server_ip}:/home/${var.ssh_user}/.kube/config ${path.module}/../../kubeconfig"
  }
}
