# The content is written in numerically ordered
# Markdown files.
CN := [1-99]*.md

# The footnotes, since they must come at the end,
# are prepended with an X.
FN := x-footnotes.md

# This is used for an unfinalised HTML file - i.e.
# a file which has not yet received all its content.
TEMP := temp.html

all:
	#--------------
	# Introduction:
	pandoc introduction/[1-99]*.md introduction/$(FN) -o $(TEMP)
	cp top-header.html index.html
	cat $(TEMP) >> index.html
	rm $(TEMP)
	#---------------
	# Consciousness:
	pandoc consciousness/[1-99]*.md consciousness/$(FN) -o $(TEMP)
	cp header.html consciousness.html
	cat $(TEMP) >> consciousness.html
	rm $(TEMP)
