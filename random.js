async function details() {
    try { /*La propriété en lecture seule Window.location renvoie un objet Location qui contient des informations à propos de l'emplacement courant du document*/
        const mealId = new URLSearchParams(window.location.search).get('mealId'); /*L'interface URLSearchParams définit des méthodes utilitaires pour travailler avec la chaîne de requête (les paramètres GET) d'une URL. Avec get retourne la première valeur associée au paramètre de recherche donné. */
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`); /*const mealid à la place de (www.themealdb.com/api/json/v1/1/lookup.php?i=52772) 52772 */
        
        if (!response.ok) { /* si la reponse est different de ok (!) alors envoi error avec throw*/
            throw new Error('Error');
        }
        
        const data = await response.json();
        const meal = data.meals[0];
        
        document.querySelector('#details').innerHTML = `
        <div>  
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>Origine</h3>
            <p>${meal.strArea}</p>
            <h3>Ingrédients</h3>
            <ul>${getIngredients(meal).join('')}</ul>
            <h3>Préparation</h3>
            <p>${meal.strInstructions}</p>
        <div>`;
    } catch (error) {
        console.error('error :', error);
    } /*Je recuper les images, le nom, la position etc je rajoute chachun une balise 
    La méthode join() crée et renvoie une nouvelle chaîne de caractères en concaténant tous les éléments d'un tableau. La concaténation utilise la virgule ou une autre chaîne, fournie en argument, comme séparateur.
    getIngredients c'est le nom de ma function pour la recherche des ingredients et les mesure, que après je vais le rejoindre dans mon ul*/
}


function getIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`<li>${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`);
        } else {
            break;
        }
    } /* Dans cette function il y a une boucle qui dis si l'objet meal est defini alors on push les ingredients et les mesures dans une string sinon avec break la boucle s'arrete parce que pas tous les plats on jusqu'a 20 ingredients, s'il est vide donc s'arrete et il vas pas jusqu'a 20.. dans le for on part de 1 et pas 0 parce que dans l'api il y avait les ingredients qui commencent de 1 (ingredients1, ingredietns2 etc*/
    return ingredients;
}

details();
