start docker-volume-watcher -v organize_zetk_in

docker run ^
    -v %cd%/static:/var/app/static ^
    -v %cd%/bin:/var/app/bin ^
    -v %cd%/locale:/var/app/locale ^
    -v %cd%/src:/var/app/src ^
    --name organize_zetk_in ^
    --env ZETKIN_LOGIN_URL=http://login.dev.zetkin.org ^
    --env ZETKIN_APP_ID=d8f492433d0740ef89c5bfbc8b162bb0 ^
    --env ZETKIN_APP_KEY=MjQ2NGU2M2QtODdkZC00YjllLWE2MGMtNmQ0YzlhYjJmNTZh ^
    --env ZETKIN_DOMAIN=dev.zetkin.org ^
    -p 80:80 ^
    -p 81:81 ^
    -t ^
    -i ^
    --rm ^
    www_zetk_in
