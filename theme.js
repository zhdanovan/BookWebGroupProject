document.getElementById('theme-toggle').addEventListener('click', function() {
    const body = document.body;
    const garland = document.querySelector('.garland');
    
    body.classList.toggle('christmas-theme');

   
    if (body.classList.contains('christmas-theme')) {
        garland.style.display = 'flex'; 
        createSnowflakes(); 
    } else {
        garland.style.display = 'none'; 
        clearSnowflakes(); 
    }
});


function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    
    for (let i = 0; i < 50; i++) { 
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
  
        const size = Math.random() * 10 + 5; 
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        
        snowflake.style.left = `${Math.random() * window.innerWidth}px`;
        
     
        snowflake.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`; 
        
        snowContainer.appendChild(snowflake);


        snowflake.addEventListener('animationend', () => {
            snowContainer.removeChild(snowflake);
        });
    }
}


function clearSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    
    while (snowContainer.firstChild) {
        snowContainer.removeChild(snowContainer.firstChild);
    }
}