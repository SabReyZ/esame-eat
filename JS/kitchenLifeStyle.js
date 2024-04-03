async function preview() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        
        if (!response.ok) { /* si la reponse est different de ok (!) alors envoi error avec throw*/
            throw new Error('Error'); /**L'instruction throw permet de lever une exception définie par l'utilisateur. L'exécution de la fonction courante sera stoppée (les instructions situées après l'instruction throw ne seront pas exécutées) et le contrôle sera passé au premier bloc catch de la pile d'appels. Si aucun bloc catch ne se trouve dans les fonctions de la pile d'appels, le programme sera terminé. */
        }
        
        const data = await response.json();
        const meal = data.meals[0];
        
        if (!meal) {
            throw new Error('Error');
        }
        
        const mealPreview = document.querySelector('#preview');
        
        if (!mealPreview) {
            throw new Error('Error');
        }
        
        mealPreview.innerHTML = `
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="Photo du repas ${meal.strMeal}">`;
        
        mealPreview.dataset.mealId = meal.idMeal; /*La propriété en lecture seule dataset, rattachée à l'interface HTMLElement, fournit un accès en lecture/écriture aux attributs de données (data-*) de l'élément. Elle expose un objet DOMStringMap (en-US) avec un élément pour chaque attribut data-. */
    } catch (error) {
        console.error('Error :', error);
    }
}

function openDetails() {
    const mealPreview = document.querySelector('#preview'); 
    
    if (!mealPreview) {
        console.error('Error');
        return;
    }
    const mealId = mealPreview.dataset.mealId;
    if (!mealId) {
        console.error('Error');
        return;
    }
    
    window.open(`random.html?mealId=${mealId}`); /**Le "?" dans une URL est utilisé pour séparer la partie principale de l'URL (la partie qui identifie le chemin de la ressource) des paramètres de la requête. */
}






