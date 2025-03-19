include .env
export $(shell sed 's/=.*//' .env)

app: 
	@cd edtech-expo && npm start

dev:
	@cd backend && npm run dev

init:
	@docker compose up -d
	@echo 'postgres@${POSTGRES_VERSION} container started'

destroy:
	@docker stop $(POSTGRES_CONTAINER_NAME)
	@echo 'postgres@${POSTGRES_VERSION} container destroyed'

install:
	@cd edtech-expo && npm install
	@cd backend && npm install

clean:
	@rm -rf edtech-expo/node_modules
	@rm -rf backend/node_modules