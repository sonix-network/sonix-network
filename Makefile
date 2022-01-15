push:
	rm -fr public/
	hugo
	echo -n 'sonix.network' > public/CNAME
	git add public
	git commit -m 'Generate new site' || true
	git branch -D gh-pages || true
	git subtree split --prefix public -b gh-pages
	git push -f origin gh-pages:gh-pages
