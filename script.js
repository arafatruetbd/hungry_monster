let errorId = document.getElementById('errorId');
let displayId = document.getElementById('displayId');
let detailId = document.getElementById('detailId');
const mealDetails = data => {
    let detailDiv = document.createElement('div');
    const detailInfo = `
<div class="card" style="width: 18rem;">
  <img src=${data.meals[0].strMealThumb} class="card-img-top" alt="...">
  <div class="card-body">
    <h3 class="card-title">${data.meals[0].strMeal}</h3>
    <h5>Ingredients</h5>
    <p class="card-text">${data.meals[0].strIngredient1}</p>
    <p class="card-text">${data.meals[0].strIngredient2}</p>
    <p class="card-text">${data.meals[0].strIngredient3}</p>
    <p class="card-text">${data.meals[0].strIngredient4}</p>
    <p class="card-text">${data.meals[0].strIngredient5}</p>
    <p class="card-text">${data.meals[0].strIngredient6}</p>
    <p class="card-text">${data.meals[0].strIngredient7}</p>
    <p class="card-text">${data.meals[0].strIngredient8}</p>
    <p class="card-text">${data.meals[0].strIngredient9}</p>
  </div>
</div>
`
    detailDiv.innerHTML = detailInfo;
    detailId.appendChild(detailDiv);
}

const displayMeal = (data) => {
    if (data.meals === null) {
        if (errorId.hasChildNodes()) {
            errorId.removeChild(errorId.childNodes[0]);
        }
        while (displayId.hasChildNodes()) {
            displayId.removeChild(displayId.firstChild);
        }
        while (detailId.hasChildNodes()) {
            detailId.removeChild(detailId.firstChild);
        }
        let errorDiv = document.createElement('div');
        const errorInfo = `
        <h3>Nothing Found</h3>
        `
        errorDiv.innerHTML = errorInfo;
        errorId.appendChild(errorDiv);
    } else {
        if (errorId.hasChildNodes()) {
            errorId.removeChild(errorId.childNodes[0]);
        }
        while (displayId.hasChildNodes()) {
            displayId.removeChild(displayId.firstChild);
        }
        while (detailId.hasChildNodes()) {
            detailId.removeChild(detailId.firstChild);
        }
        data.meals.forEach(meal => {
            let displayDiv = document.createElement('div');
            displayDiv.id = `${meal.idMeal}`;
            displayDiv.addEventListener('click', () => {
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                    .then(res => res.json())
                    .then(data => mealDetails(data))
            })
            const displayInfo = `
            <div class="card" style="width: 18rem;">
  <img class="card-img-top" src=${meal.strMealThumb} alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
  </div>
</div>
            `
            displayDiv.innerHTML = displayInfo;
            displayId.appendChild(displayDiv);
        });
    }
}

const search = () => {
    let searchValue = document.getElementById('searchInput').value;
    if (searchValue.length === 1) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`)
            .then(res => res.json())
            .then(data => displayMeal(data))
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(res => res.json())
            .then(data => displayMeal(data))
    }
}



