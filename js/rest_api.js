(function () {
    let bouton = document.getElementById('bout_nouvelles')
	let nouvelles = document.querySelector('.nouvelles section')

	window.addEventListener('load', monAjax)

	//bouton.addEventListener('mousedown', monAjax)
	
	function monAjax()
	{
	   let maRequete = new XMLHttpRequest();
	   console.log(maRequete)
	   maRequete.open('GET', monObjJS.siteURL + '/wp-json/wp/v2/posts?categories=35&order=desc');
	   maRequete.onload = function () {
		   console.log(maRequete)
		   if (maRequete.status >= 200 && maRequete.status < 400) {
			   let data = JSON.parse(maRequete.responseText);
			   let chaine = ''
			   for (const elm of data){
				   chaine += '<h2>' + elm.title.rendered + '</h2>'
				   chaine += elm.content.rendered

			   }
			   nouvelles.innerHTML = chaine;
			}
		    else {
			   console.log('La connexion est faite mais il y a une erreur')
		   }
	   }
	   maRequete.onerror = function () {
		   console.log("erreur de connexion");
	   }
	   maRequete.send()
	}
	
	/*----------------------Controle du formulaire pour les articles annonce de la categori "Nouvelles"----------------------------------*/

	let bout_ajout = document.getElementById('bout-rapide')
	bout_ajout.addEventListener('mousedown',function(){

      //console.log('ajout')

		let monArticle = {
			"title" : document.querySelector('.admin-rapide [name="title"]').value,
			"content": document.querySelector('.admin-rapide [name="content"]').value ,
			"status": "publish",
			"categories" : [35] 
		}

		console.log(monArticle)

		let creerArticle = new XMLHttpRequest();
		creerArticle.open("POST", monObjJS.siteURL + '/wp-json/wp/v2/posts')
		creerArticle.setRequestHeader("X-WP-Nonce", monObjJS.nonce)
		creerArticle.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
		creerArticle.send(JSON.stringify(monArticle))
		creerArticle.onreadystatechange = function() {
			if (creerArticle.readyState == 4){
				if (creerArticle.status == 201) {
					document.querySelector('.admin-rapide [name="title"]').value = ''
				    document.querySelector('.admin-rapide [name="content"]').value = ''
				}
				else{
					alert ('erreur vous devez r??essayer - status = ' + creerArticle.status)
				}
			}
		}

		
	})


}())