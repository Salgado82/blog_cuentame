start-env-file:
	cp .env.example .env

test:
	--

start: 
	npm start

start-dev: 
	npm run start:dev

lint:
	npm run lint

lint-fix:
	npm run lint:fix