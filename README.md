# framerator

a client side iframe rotator


## X-Frame-Options

The sites you care about should be doing what they can to do keep users from
getting [click-jacked](https://en.wikipedia.org/wiki/Clickjacking). This
typically includes serving `X-Frame-Options` to disable being loaded in
iframes. As such framerator, out of the box, may be of limited functionality
for you. Put it together with a server-side proxying solution, and you're in
business.


## Usage

Visit `/edit` and enter some urls you'd like to cycle through, and a MS
duration for which to display url. Hit play and let it cycle through 'em.


## Local Dev

* pull the repo
* `npm install`
* `npm run dev`

That's run a webpack build (with a watcher) and serve the `www` directory on
port `8080`.


## TODOs

* drag-n-drop to change order of urls


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
