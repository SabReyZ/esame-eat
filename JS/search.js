async function details() {
    const searchtext = document.querySelector("#nomPlats").value
    try { 
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchtext}`); 
        
        if (!response.ok) { 
            throw new Error('Error');
        }
        
        const data = await response.json();
        const meals = data.meals;
        const results = document.querySelector('#detailSearch')
        results.innerHTML = ''
        
        for(let m of meals) {
            results.innerHTML += `
            <ol>
                <a href="meal.html?id=${m.idMeal}">
                    <h1>${m.strMeal}</h1>
                    <img src="${m.strMealThumb}" alt="Photo du repas ${m.strMeal}">
                </a>
            </ol>`;
        }
        
   
} catch (error) {
    console.error('Error:', error);
    alert("Repas non trouvé. Veuillez réessayer avec un autre nom.");
}


}

const searchBtn = document.querySelector("#searchBtn")

searchBtn.addEventListener('click', details)

