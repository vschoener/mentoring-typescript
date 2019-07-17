.PHONY: build

build:
	docker-compose build

shell:
	docker-compose run --rm app bash
