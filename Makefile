SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.ONESHELL:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

NODE_ENV ?= development
LEVEL ?= I

.PHONY: help
help: ## View help information
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: bootstrap
bootstrap: ## Bootstrap project
	@bash ./ops/scripts/bootstrap.sh

.PHONY: dev
dev: ## Run Next.js dev server
	pnpm run dev

.PHONY: dev-clean
dev-clean: ## Clean .next then run dev server
	pnpm run dev:clean

.PHONY: clean
clean: ## Remove .next build cache
	pnpm run clean

.PHONY: build
build: ## Build Next.js app
	pnpm run build

.PHONY: start
start: ## Start production server
	pnpm run start

.PHONY: test
test: ## Run test suite
	pnpm run test

.PHONY: lint
lint: ## Run ESLint
	pnpm run lint

.PHONY: typecheck
typecheck: ## Run TypeScript type-checker (no emit)
	pnpm run typecheck

.PHONY: lint-fix
lint-fix: ## Run ESLint with fixes
	pnpm run lint:fix

.PHONY: lint-json
lint-json: ## Validate/sort JSON translation and public files
	pnpm run lint:json

.PHONY: format
format: ## Run Prettier and JSON lint/sort
	pnpm run format

.PHONY: quality
quality: ## Run core frontend quality gates (lint, test)
	pnpm run lint
	pnpm run test

.PHONY: ci
ci: ## Run CI-aligned checks (alias of quality)
	$(MAKE) quality

