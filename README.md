# Mvideo check product availability
Because purple iPhone 11 is in short supply I wrote a small puppeteer script that checks its avalability for me.
Some params are moved to settings so you can track any product in any available city on mvideo site.
## Settings params
`city` - your city to check;

`updateFrequency` - how often will script check availability of the product;

`url` - url of product you're interested in.
## How to run
You can run it in your terminal with `npm start` command and it will log all data to it. 

For background updates there are `start.sh` and `stop.sh` scripts, that use `pm2` pacakge to run `start:terminal` npm script.
It will log everything to any file or output stream that you'll choose.
