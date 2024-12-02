document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        document.querySelector('#loginForm').classList.remove('hidden');
    } else {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        document.getElementById('username').textContent = userData.name;


        if (!Array.isArray(userData.favorites)) {
            userData.favorites = []; 
        }
        
        displayFavorites(userData.favorites);
    }

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        const userData = JSON.parse(localStorage.getItem(username));
        
        if (userData && userData.password === password) {
            localStorage.setItem('currentUser', username);
            window.location.href = 'profile.html';
        } else {
            alert("Неверный логин или пароль.");
        }
    });

    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (password !== confirmPassword) {
            alert("Пароли не совпадают.");
            return;
        }

        if (localStorage.getItem(username)) {
            alert("Пользователь с таким логином уже существует.");
            return;
        }

        const name = document.getElementById('registerName').value;

        const newUser = {
            name: name,
            password: password,
            favorites: [] 
        };

        localStorage.setItem(username, JSON.stringify(newUser));
        
        alert("Регистрация прошла успешно! Теперь вы можете войти в систему.");
        
        document.getElementById('registerForm').classList.add('hidden');
    });

    document.getElementById('logoutButton')?.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'profile.html';
    });
});


function displayFavorites(favorites) {
    const favoritesContainer = document.getElementById('favoritesContainer');
    favoritesContainer.innerHTML = ''; 

    if (!Array.isArray(favorites) || favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>У вас нет избранных книг.</p>';
        return;
    }

    favorites.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('favorite-card');
        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-image">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <button onclick='removeFromFavorites(${JSON.stringify(book)})'>Удалить из избранного</button>
        `;
        favoritesContainer.appendChild(card);
    });
}


function removeFromFavorites(book) {
    const currentUser = localStorage.getItem('currentUser');
    const userData = JSON.parse(localStorage.getItem(currentUser));

    userData.favorites = userData.favorites.filter(fav => fav.title !== book.title);
    
    localStorage.setItem(currentUser, JSON.stringify(userData));
    
    alert(`${book.title} удалена из избранного!`);
    
    displayFavorites(userData.favorites); 
}


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