pip install docker-windows-volume-watcher &

docker build ^
    -t www_zetk_in ^
    --build-arg NODE_ENV=development ^
    -f ./env/app/Dockerfile ^
    .
