node bloomberg/app.js > logs/bloomberg.log 2>&1 &
node cnbc/app.js > logs/cnbc.log 2>&1 &
node app.js


while :; do
    sleep 5
done