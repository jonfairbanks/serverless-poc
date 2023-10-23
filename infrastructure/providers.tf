
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
    mongodbatlas = {
      source = "mongodb/mongodbatlas"
    }
  }
  required_version = ">= 0.13"
}

provider "aws" {
    shared_credentials_files = ["~/.aws/credentials"]
    profile = "default"
    region = "us-east-1"
}

provider "mongodbatlas" {
  public_key = var.mongodb_atlas_public_key
  private_key  = var.mongodb_atlas_private_key
}