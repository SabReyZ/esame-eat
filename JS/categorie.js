async function categoryP() {
    try { 
        const query = new URLSearchParams(window.location.search).get('category'); 
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`); /**je cherche mon query dans la category */
        
        if (!response.ok) { 
            throw new Error('Error');
        }

        const data = await response.json();
        const meal = document.querySelector("#cat"); /**J'affiche le meal sur la page html */
        /*La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.*/
        meal.innerHTML = data.meals.map(meal => ` 
            <li>
                <a href="meal.html?id=${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <p>${meal.strMeal}</p> 
                </a>
            </li>`
        ).join(''); /**meals on le trouve sur l'url c'est le "titre" je recupere pour ma variable meal l'id qui me servira pour appeler le plat dans ma page meal.html, la photo e le nom*/
    } catch (error) {
        console.error("Error :", error); /* s'il y a rien qui va dans tous ca..renvoie error*/
    }
}

categoryP(); 









