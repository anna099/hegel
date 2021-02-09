#!/usr/bin/env bash

#
# Each chapter produces a single HTML page; the
# source for a chapter is in a single folder
# (listed below), consisting of
#
#       'contents.html'  - a table of contents
#       '[1-99]*.md'     - the main body of the chapter
#       'x-footnotes.md' - the footnotes for the chapter
#
# The first chapter ('introduction') is slightly different;
# it produces the index.html file and has the full table
# of contents.
#

chapters=('introduction' 'prologue'
        \ 'consciousness'
        \ 'self-consciousness'
        \ 'reason-intro' 'observing-nature' 'observing-self')

FN=x-footnotes.md
TEMP=temp.html

for i in "${chapters[@]}"; do
    if [ $i = ${chapters[0]} ]; then
        pandoc $i/[0-99]*.md $i/$FN -o $TEMP
	cp top-header.html index.html
	cat $i/contents.html >> index.html
	cat $TEMP >> index.html
	rm $TEMP
    else
        pandoc $i/[0-99]*.md $i/$FN -o $TEMP
        cp header.html $i.html
        cat $i/contents.html >> $i.html
        cat $TEMP >> $i.html
        rm $TEMP
    fi
done
