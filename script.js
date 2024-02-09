// Fonction pour vérifier si toutes les cases sont cochées
function checkAllBoxes() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var allChecked = true;
    checkboxes.forEach(function(checkbox) {
        if (!checkbox.checked) {
            allChecked = false;
        }
    });
    return allChecked;
}

// Fonction appelée lorsqu'une case est cochée ou décochée
function handleCheckboxChange() {
    var submitButton = document.getElementById('submitButton');
    if (checkAllBoxes()) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// Attacher la fonction handleCheckboxChange à chaque case à cocher
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange);
});

// Fonction appelée lorsque le bouton est cliqué
function submitTest() {
    // Rediriger vers la page de simulation si le bouton est disponible
    var submitButton = document.getElementById('submitButton');
    if (!submitButton.disabled) {
        window.location.href = 'message.html';
    }
}
