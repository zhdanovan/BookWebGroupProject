document.addEventListener('DOMContentLoaded', () => {
    const bookCardsContainer = document.querySelector('.book-cards');


    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(book => {
                const card = document.createElement('div');
                card.classList.add('book-card');
                card.innerHTML = `
                    <img src="${book.image}" alt="${book.title}" class="book-image">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <p class="book-description">${book.description}</p>
                    <button onclick='addToFavorites(${JSON.stringify(book)})'>Добавить в избранное</button>
    <img width="24" height="24" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-add-a-rating-star-to-give-feedback-online-votes-color-tal-revivo.png" alt="Иконка звездочки"/>
                `;
                bookCardsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Ошибка при загрузке книг:', error));
});


function addToFavorites(book) {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        alert("Пожалуйста, войдите в систему, чтобы добавлять книги в избранное.");
        return;
    }

    const userData = JSON.parse(localStorage.getItem(currentUser));
    
    if (!userData.favorites.some(fav => fav.title === book.title)) { 
        userData.favorites.push(book);
        
        localStorage.setItem(currentUser, JSON.stringify(userData));
        
        alert(`${book.title} добавлена в избранное!`);
    } else {
        alert(`${book.title} уже в избранном!`);
    }
}