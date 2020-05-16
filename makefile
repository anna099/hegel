OUT := index.html
PDFOUT := hegel.pdf
FN := x-footnotes.md

PDFOPTIONS := -V papersize=a5
PDFOPTIONS += -V geometry:"top=1cm, bottom=3.5cm, left=2cm, right=2cm"

index:
	pandoc *.md -o $(OUT)
	@printf "</body>\n" >> $(OUT)
	@printf "<script>let c=0,x=document.createElement('p');x.id='wordcount';document.querySelectorAll('p').forEach(x=>c+=x.innerText.split(' ').length);x.innerText=c+' words';document.body.appendChild(x)</script>" >> $(OUT)
	@printf "</html>" >> $(OUT)
	js-beautify $(OUT) > _$(OUT)
	mv _$(OUT) $(OUT)

pdf:
	pandoc [1-99]*.md $(FN) $(PDFOPTIONS) -o $(PDFOUT)
