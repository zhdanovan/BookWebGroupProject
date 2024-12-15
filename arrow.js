
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

leftArrow.addEventListener('click', () => {
   bookCover.rotation.y -= Math.PI / 12; 
});

rightArrow.addEventListener('click', () => {
   bookCover.rotation.y += Math.PI / 12; 
});

function animateArrows() {
   leftArrow.style.transform = 'translateY(-50%) scale(1.1)';
   rightArrow.style.transform = 'translateY(-50%) scale(1.1)';

   setTimeout(() => {
       leftArrow.style.transform = 'translateY(-50%) scale(1)';
       rightArrow.style.transform = 'translateY(-50%) scale(1)';
   }, 500);
}

setInterval(animateArrows, 2000);

