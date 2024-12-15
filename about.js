document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 


    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

 
    const contactData = {
        name,
        email,
        message
    };


    localStorage.setItem('contactData', JSON.stringify(contactData));

    this.reset();

 
    const modal = document.getElementById("modal");
    modal.style.display = "block";

    
    document.querySelector(".close-button").onclick = function() {
        modal.style.display = "none";
    }

  
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});