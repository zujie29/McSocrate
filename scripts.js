const messages = [
    { sender: 'Marie', text: "Salut, ça te dirait d'échanger nos numéros WhatsApp ?" },
    { sender: 'Pierre', text: "Coucou, serais-tu partant pour un café ce weekend ?" },
    { sender: 'Sophie', text: "Hello ! Peux-tu me donner ton numéro WhatsApp ? J'aimerais discuter plus facilement." },
    { sender: 'Lucas', text: "Hey, que dirais-tu d'une balade en vélo demain ?" },
    { sender: 'Camille', text: "Bonjour ! Si ça te dit, on pourrait se retrouver ce soir pour prendre un verre ?" },
    { sender: 'Thomas', text: "Salut, échangeons nos numéros WhatsApp pour rester en contact." },
    { sender: 'Laura', text: "Coucou, serais-tu partant pour un dîner ensemble ce samedi ?" },
    { sender: 'Julien', text: "Salut ! Peux-tu me passer ton numéro WhatsApp ? J'aimerais t'inviter à une soirée entre amis." },
    { sender: 'Manon', text: "Hello, échangeons nos numéros WhatsApp pour discuter de notre projet." },
    { sender: 'Alexandre', text: "Bonjour ! Que dirais-tu d'une petite sortie au cinéma ce soir ?" },
    { sender: 'Emma', text: "Salut, serais-tu partant pour une randonnée ce weekend ?" },
    { sender: 'Nicolas', text: "Coucou ! J'aimerais bien qu'on se retrouve pour un déjeuner ce midi, ça te dit ?" },
    { sender: 'Léa', text: "Hello, donne-moi ton numéro WhatsApp pour qu'on puisse organiser notre prochaine réunion." },
    { sender: 'Hugo', text: "Salut, échangeons nos numéros WhatsApp pour parler de ce nouveau projet." },
    { sender: 'Chloé', text: "Coucou ! Que penses-tu de se retrouver pour un brunch ce dimanche ?" },
    { sender: 'Mathieu', text: "Bonjour, j'aimerais bien qu'on se rencontre pour discuter de nos idées. Peux-tu me donner ton numéro WhatsApp ?" },
    { sender: 'Pauline', text: "Hello ! Peux-tu me passer ton numéro WhatsApp ? J'aimerais t'inviter à une expo d'art ce weekend." },
    { sender: 'Maxime', text: "Salut, ça te dirait de faire du sport ensemble demain matin ? Donne-moi ton numéro WhatsApp pour qu'on s'organise." },
    { sender: 'Clara', text: "Coucou ! Que penses-tu de se retrouver pour un pique-nique au parc ce samedi ?" },
    { sender: 'Antoine', text: "Bonjour, échangeons nos numéros WhatsApp pour partager nos lectures préférées." },
    { sender: 'Elodie', text: "Hello ! Que dirais-tu d'une soirée cinéma à la maison ce soir ?" },
    { sender: 'Baptiste', text: "Salut, j'aimerais bien qu'on se rencontre pour discuter de notre projet. Peux-tu me donner ton numéro WhatsApp ?" },
    { sender: 'Charlotte', text: "Coucou ! Serait-il possible de récupérer ton numéro WhatsApp ? J'aimerais organiser une sortie entre amis." },
    { sender: 'Olivier', text: "Bonjour, échangeons nos numéros WhatsApp pour rester en contact." },
    { sender: 'Maëlle', text: "Hello ! Que penses-tu d'une virée shopping ce samedi après-midi ?" },
    { sender: 'Quentin', text: "Salut, échangeons nos numéros WhatsApp pour discuter de cette expo dont tu m'as parlé." },
    { sender: 'Inès', text: "Coucou ! Que dirais-tu d'une soirée jeux de société chez moi ce samedi ?" },
    { sender: 'Gabriel', text: "Bonjour, serais-tu disponible pour prendre un café ce mercredi ?" },
    { sender: 'Johanna', text: "Hello, échangeons nos numéros WhatsApp pour qu'on puisse discuter de cette idée de cadeau." },
    { sender: 'Romain', text: "Salut ! J'aimerais bien qu'on se retrouve pour une balade au parc ce dimanche. Peux-tu me donner ton numéro WhatsApp ?" }
];

const container = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');

let currentMessageIndex = 0;

function displayMessage(message) {
    container.innerHTML = ''; // Efface le contenu précédent
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.classList.add(message.sender === 'You' ? 'sent' : 'received');
    newMessage.innerHTML = `<strong>${message.sender}:</strong> ${message.text}`;
    container.appendChild(newMessage);
    container.scrollTop = container.scrollHeight; // Scroll jusqu'en bas
    
    // Démarrage du chronomètre
    const timestampSpan = document.createElement('span');
    timestampSpan.classList.add('timestamp');
    newMessage.appendChild(timestampSpan); // Ajout du chronomètre au nouveau message
    let seconds = 0;
    const timer = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        timestampSpan.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    }, 1000);
    
    // Arrêter le chronomètre lorsque le message est supprimé
    newMessage.addEventListener('remove', () => {
        clearInterval(timer);
        newMessage.removeChild(timestampSpan); // Suppression du chronomètre du message
    });
}



function sendMessage() {
    const response = messageInput.value.trim();
    if (response !== '') {
        const responseMessage = { sender: 'You', text: response };
        container.innerHTML = ''; // Efface le message précédent pour démarrer à zéro
        displayMessage(responseMessage);
        messageInput.value = '';
        currentMessageIndex++;

        showWaitingMessage(); // Affiche un message d'attente

        setTimeout(() => {
            if (currentMessageIndex < messages.length) {
                displayMessage(messages[currentMessageIndex]);
                hideWaitingMessage(); // Cache le message d'attente une fois que le prochain message est affiché
            } else {
                hideWaitingMessage(); // Cache le message d'attente si tous les messages ont été envoyés
            }
        }, getRandomDelay(6000, 18000)); // Attend entre 6 et 18 secondes avant d'afficher le prochain message
    }
}

function hideWaitingMessage() {
    const waitingMessage = document.querySelector('.waiting-message');
    if (waitingMessage) {
        waitingMessage.parentNode.removeChild(waitingMessage);
    }
}

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showWaitingMessage() {
    const waitingMessage = document.createElement('div');
    waitingMessage.classList.add('waiting-message');
    waitingMessage.textContent = "En attente de nouveaux messages...";
    document.body.appendChild(waitingMessage);
}




// Permet d'envoyer le message en appuyant sur "Entrée"
messageInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Affiche le premier message au démarrage
displayMessage(messages[currentMessageIndex]);


document.getElementById('sendButton').addEventListener('click', function() {
    var messageInput = document.getElementById('messageInput').value;
    if (messageInput.trim() !== '') {
        var messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML += '<div class="message">' + messageInput + '</div>';
        
        // Enregistrement dans le stockage local
        saveMessage(messageInput);
        
        // Effacer le champ de saisie
        document.getElementById('messageInput').value = '';
    }
});
