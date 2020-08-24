#!/usr/bin/env bash

declare -a chapters=('introduction' 'consciousness' 'self-consciousness')
FN=x-footnotes.md
TEMP=temp.html

# HTML
for i in "${chapters[@]}"; do
    if [ $i = ${chapters[0]} ]; then
        pandoc $i/[1-99]*.md $i/$FN -o $TEMP
	cp top-header.html index.html
	cat contents.html >> index.html
	cat $TEMP >> index.html
	rm $TEMP
    else
        pandoc $i/[1-99]*.md $i/$FN -o $TEMP
        cp header.html $i.html
        cat contents.html >> $i.html
        cat $TEMP >> $i.html
        rm $TEMP
    fi
done

# PDF
for i in "${chapters[@]}"; do
    pandoc --quiet -t html --css pdf.css -V papersize:a5 \
        $i/[1-99]*.md $i/$FN -o pdf/$i.pdf
done
