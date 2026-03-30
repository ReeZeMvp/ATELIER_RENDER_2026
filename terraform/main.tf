terraform {
  required_providers {
    render = {
      source  = "render-oss/render"
      version = ">= 1.7.0"
    }
  }
}

provider "render" {
  api_key  = var.render_api_key
  owner_id = var.render_owner_id
}

variable "github_actor" {
  description = "GitHub username"
  type        = string
}

resource "render_web_service" "flask_app" {
  name   = "flask-render-iac-${var.github_actor}"
  plan   = "free"
  region = "frankfurt"

  runtime_source = {
    image = {
      image_url = var.image_url
      tag       = var.image_tag
    }
  }

  env_vars = {
    ENV = {
      value = "production"
    }
    DATABASE_URL = {
      value = render_postgres.database.connection_info.internal_connection_string
    }
  }
}

resource "render_postgres" "database" {
  name          = "flask-postgres-${var.github_actor}"
  plan          = "free"
  region        = "frankfurt"
  version       = "16"
  database_name = "appdb"
  database_user = "appuser"
}

resource "render_web_service" "adminer" {
  name       = "adminer-${var.github_actor}"
  plan       = "free"
  region     = "frankfurt"

  runtime_source = {
    image = {
      image_url = "docker.io/adminer:latest"
    }
  }

  env_vars = {
    ADMINER_DEFAULT_SERVER = {
      value = render_postgres.database.connection_info.external_connection_string
    }
  }
}