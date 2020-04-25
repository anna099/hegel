OUT := index.html

index:
	pandoc *.md -o $(OUT)
	@printf "</body>\n" >> $(OUT)
	@printf "<script>let c=0,x=document.createElement('p');x.id='wordcount';document.querySelectorAll('p').forEach(x=>c+=x.innerText.split(' ').length);x.innerText=c+' words';document.body.appendChild(x)</script>" >> $(OUT)
	@printf "</html>" >> $(OUT)
