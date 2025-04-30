# Makefile para alternar entre desenvolvimento e produção

.PHONY: dev prod

# Rodar ambiente de desenvolvimento (hot reload)
dev:
	docker-compose -f docker-compose.dev.yml up --build -d

# Rodar ambiente de produção (build estático)
prod:
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d
