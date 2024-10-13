
const modal = document.getElementById('modal');


const closeModal = document.querySelector('.close');


function openModal(countryName, imageUrl, description) {
    document.getElementById('modal-title').textContent = countryName;
    document.getElementById('modal-image').src = imageUrl;
    document.getElementById('modal-description').textContent = description;
    modal.style.display = 'flex';
}


closeModal.onclick = function() {
    modal.style.display = 'none';
}


window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}


const buttons = document.querySelectorAll('.visit-place');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const country = button.dataset.country;
        const image = button.dataset.image;
        const description = button.dataset.description;
        openModal(country, image, description);
    });
});

