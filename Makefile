run:
	env HUGO_PARAMS_githash=$(shell git describe --match=NeVeRmAtCh --always --abbrev=8 --dirty) \
		hugo server --bind 0.0.0.0

clean:
	rm -rf public/
