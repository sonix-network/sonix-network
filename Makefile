run:
	env HUGO_PARAMS_githash=$(shell git describe --match=NeVeRmAtCh --always --abbrev=8 --dirty) \
		hugo server

clean:
	rm -rf public/
