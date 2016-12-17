NAME := tetris-react
PORT := 3000
APP_DIR := tetris
build:
	docker build -t ${NAME} . && \
		docker run --name ${NAME}-client-container \
		--rm \
		-it \
		-v `pwd`/${APP_DIR}:/usr/src/app/ \
		${NAME} npm install
run:
	docker run --name ${NAME}-client-container \
		--rm \
		-p 3453:${PORT} \
		-it \
		-v `pwd`/${APP_DIR}:/usr/src/app/ \
		${NAME}
test:
	docker run --name ${NAME}-client-container-test \
		--rm \
		-it \
		-v `pwd`/${APP_DIR}:/usr/src/app/ \
		${NAME} npm test
sh:
	docker run --name ${NAME}-client-container-sh \
		--rm \
		-p 3454:${PORT} \
		-it \
		-v `pwd`/${APP_DIR}:/usr/src/app/ \
		${NAME} /bin/bash
