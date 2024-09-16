terraform {
  required_providers {
    null = {
      source = "hashicorp/null"
    }
    local = {
      source = "hashicorp/local"
    }
  }
  required_version = ">= 0.14"
}

provider "null" {}
provider "local" {}
