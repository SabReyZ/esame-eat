async function alpha(e) {
    const letter  = e.target.textContent
    try { 
        
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`); 
        if (!response.ok) { 
            throw new Error('Error');
        }
        const data = await response.json(); 
        const meals = data.meals;

        const results = document.querySelector("#listeaz")
        results.innerHTML = ''

        for(let m of meals) {
            results.innerHTML += `
            <li>
                <a href="meal.html?id=${m.idMeal}">
                    <h1>${m.strMeal}</h1>
                    <img src="${m.strMealThumb}" alt="Photo du repas ${m.strMeal}">
                </a>
            </li>`;
        }
    } catch (error) {
        console.error("Error :", error); /* s'il y a rien qui va dans tous ca..renvoie error*/
    }
}

const letters = document.querySelectorAll("p.alphabet-btn")

for(let l of letters) {
    l.addEventListener('click', alpha)

}
