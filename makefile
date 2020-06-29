OUT := index.html
FN := x-footnotes.md

index:
	pandoc [1-99]*.md $(FN) -o _$(OUT)
	cp header.html $(OUT)
	cat _$(OUT) >> $(OUT)
	rm _$(OUT)
	@printf "</body>\n" >> $(OUT)
	@printf "<script>let c=0,x=document.createElement('p');x.id='wordcount';document.querySelectorAll('p').forEach(x=>c+=x.innerText.split(' ').length);x.innerText=c+' words';document.body.appendChild(x)</script>" >> $(OUT)
	@printf "</html>" >> $(OUT)
