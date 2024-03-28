async function mealDetails() {
    try { 
        const id = new URLSearchParams(window.location.search).get('id'); 
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) { 
            throw new Error('Error');
        }

        const data = await response.json();
        const meals = data.meals[0];
        const mealHTML = document.querySelector("#meal");
        mealHTML.innerHTML = `
            <div>
                <h1>${meals.strMeal}</h1>
                <img src="${meals.strMealThumb}" alt="${meals.strMeal}">
                <h3>Origine</h3>
                <p>${meals.strArea}</p>
                <h3>Ingrédients</h3>
                <ul>${getIngredients(meals).join('')}</ul>
                <h3>Préparation</h3>
                <p>${meals.strInstructions}</p>
            </div>`; 
    } catch (error) {
        console.error("Error :", error); /* s'il y a rien qui va dans tous ca..renvoie error*/
    }
}
function getIngredients(meals) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meals[`strIngredient${i}`]) {
            ingredients.push(`<li>${meals[`strMeasure${i}`]} ${meals[`strIngredient${i}`]}</li>`);
        } else {
            break;
        }
    } /* Dans cette function il y a une boucle qui dis si l'objet meal est defini alors on push les ingredients et les mesures dans une string sinon avec break la boucle s'arrete parce que pas tous les plats on jusqu'a 20 ingredients, s'il est vide donc s'arrete et il vas pas jusqu'a 20.. dans le for on part de 1 et pas 0 parce que dans l'api il y avait les ingredients qui commencent de 1 (ingredients1, ingredietns2 etc*/
    return ingredients;
}

mealDetails();

       