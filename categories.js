async function categories() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php"); /*url categories*/ 
        if (!response.ok) { /* si la reponse est different de ok (!) alors envoi error avec throw*/
            throw new Error("Error");
        }
        
        const data = await response.json();
        const CtListe = document.querySelector("#liste");
        /*La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.*/
       CtListe.innerHTML = data.categories.map(category => `
            <li>
                <a href="categorie.html?category=${category.strCategory}">
                    <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
                    <p>${category.strCategory}</p> 
                </a>
            </li>`
        ).join(''); /*je recupere les images(strCategoryThumb) le nom 2 fois (strCategory) un pour le alt un pour le paragraphe pour le mettre en ligne*/
    } catch (error) {
        console.error("Error :", error); /* s'il y a rien qui va dans tous ca..renvoie error*/
    }
}

categories(); /*afficher la function*/






            