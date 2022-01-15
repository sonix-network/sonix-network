push:
	rm -fr public/
	hugo
	echo -n 'sonix.network' > public/CNAME
	git add public
	git commit -m 'Generate new site'
	git subtree push --prefix public origin gh-pages
