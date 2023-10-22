#main.tf

terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
    shared_credentials_files = ["~/.aws/credentials"]
    profile = "default"
    region = "us-east-1"
}

resource "aws_route53_zone" "primary_domain" {
  name = var.primary_domain
}

resource "aws_acm_certificate" "primary_domain_cert" {
  domain_name = aws_route53_zone.primary_domain.name
  validation_method = "DNS"

  subject_alternative_names = [
    aws_route53_zone.primary_domain.name,
    "*.${aws_route53_zone.primary_domain.name}"
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "primary_domain_cert_validation_records" {
  for_each = {
    for dvo in aws_acm_certificate.primary_domain_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.primary_domain.zone_id
}

resource "aws_ssm_parameter" "primary_domain_cert_arn" {
  name = "primary_domain_cert_arn"
  type = "String"
  value = aws_acm_certificate.primary_domain_cert.arn
  description = "Certificate ARN for primary domain"
}

resource "aws_ssm_parameter" "primary_domain_name" {
  name = "primary_domain_name"
  type = "String"
  value = var.primary_domain
  description = "DNS name of primary domain"
}

#create a security group for RDS Database Instance
resource "aws_security_group" "rds_sg" {
    name = "rds_sg"
    ingress {
        from_port       = 5432
        to_port         = 5432
        protocol        = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

# get secrets from AWS Systems Manager Parameter store by name
/* data "aws_ssm_parameter" "postgres_rds_db_username" {
  name = "postgres_rds_db_username"
}

data "aws_ssm_parameter" "postgres_rds_db_password" {
  name = "postgres_rds_db_password"
}
 */
#create a RDS Database Instance using values from parameter store
/* resource "aws_db_instance" "pg-prod" {
    identifier           = "pg-prod"
    engine               = "postgres"
    engine_version       = "12.15"
    parameter_group_name = "default.postgres12"
    instance_class       = "db.t3.micro"
    allocated_storage    =  20
    storage_type         = "gp2"
    username             = data.aws_ssm_parameter.postgres_rds_db_username.value
    password             = data.aws_ssm_parameter.postgres_rds_db_password.value
    vpc_security_group_ids = ["${aws_security_group.rds_sg.id}"]
    skip_final_snapshot  = true
    publicly_accessible =  true
    maintenance_window      = "Mon:00:00-Mon:03:00"
    backup_window           = "03:00-06:00"
    backup_retention_period = 1
} */
