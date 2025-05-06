// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // 1. Event Handling
    
    // Button click
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.innerHTML = `
    <div style="
        background: linear-gradient(to right,rgb(202, 146, 41),rgb(172, 106, 21));
        padding: 20px;
        border-radius: 12px;
        color: #111;
        box-shadow: 0 6px 20px rgba(249, 212, 35, 0.4);
        display: flex;
        align-items: center;
        gap: 20px;
        max-width: 450px;
        border: 2px solid #fff;
        animation: pulse 0.5s ease-in-out;
    ">
        <img src="yuji.jpeg" 
             alt="Yuji Itadori" 
             style="width: 120px; height: 120px; border-radius: 10px; border: 3px solid #fff; object-fit: cover;">
        <div>
            <h3 style="margin: 0 0 8px 0; font-size: 1.4em; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Button was clicked! 🔥</h3>
            <p style="margin: 0; font-size: 15px; font-weight: 500;">
                "I'm gonna keep killing curses until I've killed all the bad guys in the world!"<br>
                - Yuji Itadori
            </p>
            <div style="margin-top: 10px; display: flex; gap: 8px;">
                <span style="background: rgba(216, 150, 96, 0.7); padding: 4px 8px; border-radius: 20px; font-size: 12px;">Sukuna's Vessel</span>
                <span style="background: rgba(143, 77, 23, 0.7); padding: 4px 8px; border-radius: 20px; font-size: 12px;">Jujutsu Sorcerer</span>
            </div>
        </div>
    </div>

    <style>
        @keyframes pulse {
            0% { transform: scale(0.95); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    </style>
`;
        clickButton.textContent = 'Clicked!';
        clickButton.style.backgroundColor = '#2ecc71';
        
        // Reset after 1.5 seconds
        setTimeout(() => {
            clickOutput.textContent = 'Button not clicked yet';
            clickButton.textContent = 'Click Me!';
            clickButton.style.backgroundColor = '#3498db';
        }, 1500);
    });
    
    // Hover effects
    const hoverBox = document.getElementById('hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.innerHTML = `
            <div style="
                background: linear-gradient(135deg,rgb(153, 145, 175) 0%,rgb(226, 236, 236) 100%);
                padding: 20px;
                border-radius: 10px;
                color: white;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 15px;
                max-width: 400px;
            ">
                <img src="gojo.jpeg" 
                     alt="Gojo Satoru" 
                     style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid white;">
                <div>
                    <h3 style="margin: 0 0 5px 0;">Mouse is hovering! 🌀</h3>
                    <p style="margin: 0; font-size: 14px;">"
                        Throughout Heaven and Earth, I alone am the hovered one." 
                        - Gojo Satoru
                    </p>
                </div>
            </div>
        `;
    });
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Waiting for hover...';
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keydown', function(e) {
        keypressOutput.textContent = `You pressed: ${e.key} (Key code: ${e.keyCode})`;
    });
    
    // Enhanced Secret Button Functionality
    const secretButton = document.getElementById('secret-button');
    const secretOutput = document.getElementById('secret-output');
    const initialMessage = document.querySelector('.initial-message');
    const animeSecrets = document.querySelector('.anime-secrets');
    const secretCards = document.querySelectorAll('.secret-card');
    const secretCounter = document.querySelector('.secret-counter');
    const secretCount = document.getElementById('secret-count');
    const secretProgress = document.getElementById('secret-progress');
    
    let foundSecrets = [];
    let pressTimer;
    
    // Double-click reveals first secret
    secretButton.addEventListener('dblclick', function(e) {
        e.preventDefault();
        revealSecret(1);
    });
    
    // Long press reveals second secret
    secretButton.addEventListener('mousedown', function(e) {
        pressTimer = setTimeout(() => {
            revealSecret(2);
        }, 1000);
    });
    
    secretButton.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretButton.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // Right-click reveals third secret
    secretButton.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        revealSecret(3);
    });
    
    // Shift+Click reveals fourth secret
    secretButton.addEventListener('click', function(e) {
        if (e.shiftKey) {
            e.preventDefault();
            revealSecret(4);
        }
    });
    
    // Next secret buttons
    document.querySelectorAll('.next-secret').forEach(button => {
        button.addEventListener('click', function() {
            const currentCard = this.closest('.secret-card');
            const currentSecret = parseInt(currentCard.dataset.secret);
            
            // Find next available secret
            let nextSecret = currentSecret + 1;
            if (nextSecret > 4) nextSecret = 1;
            
            while (nextSecret !== currentSecret && !foundSecrets.includes(nextSecret)) {
                nextSecret++;
                if (nextSecret > 4) nextSecret = 1;
            }
            
            if (foundSecrets.includes(nextSecret)) {
                showSecretCard(nextSecret);
            }
        });
    });
    
    function revealSecret(secretNumber) {
        if (!foundSecrets.includes(secretNumber)) {
            foundSecrets.push(secretNumber);
            updateSecretCounter();
            
            // Show the revealed secret
            showSecretCard(secretNumber);
            
            // Create confetti effect
            createConfetti();
            
            // Special effect when all secrets are found
            if (foundSecrets.length === 4) {
                secretOutput.classList.add('all-secrets-unlocked');
            }
        } else {
            showSecretCard(secretNumber);
        }
    }
    
    function showSecretCard(secretNumber) {
        initialMessage.classList.add('hidden');
        animeSecrets.classList.remove('hidden');
        animeSecrets.classList.add('visible');
        
        secretCards.forEach(card => {
            card.style.display = 'none';
            if (parseInt(card.dataset.secret) === secretNumber) {
                card.style.display = 'block';
                card.style.animation = 'animeEntry 0.7s ease';
            }
        });
    }
    
    function updateSecretCounter() {
        secretCounter.classList.remove('hidden');
        secretCount.textContent = foundSecrets.length;
        secretProgress.value = foundSecrets.length;
    }
    
    function createConfetti() {
        const colors = ['#f1c40f', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#1abc9c'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '100%';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            secretOutput.appendChild(confetti);
            
            // Animate confetti
            setTimeout(() => {
                confetti.style.opacity = '1';
                confetti.style.transform = `translateY(-${Math.random() * 100 + 50}px) rotate(${Math.random() * 360}deg)`;
                confetti.style.transition = `all ${Math.random() * 1 + 0.5}s ease-out`;
                
                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, 1000);
            }, 10);
        }
    }
    
    // 2. Interactive Elements
    
    // Color changing button
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color ${colorIndex + 1} of ${colors.length}`;
    });
    
    // Image gallery
    const galleryImages = document.querySelectorAll('.gallery-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        currentImageIndex = index;
    }
    
    nextBtn.addEventListener('click', function() {
        let nextIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(nextIndex);
    });
    
    prevBtn.addEventListener('click', function() {
        let prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(prevIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        let nextIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(nextIndex);
    }, 3000);
    
    // Tab system
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 3. Form Validation
    const userForm = document.getElementById('user-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    const formSuccess = document.getElementById('form-success');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            nameInput.classList.add('shake');
            setTimeout(() => nameInput.classList.remove('shake'), 500);
            return false;
        } else {
            nameError.style.display = 'none';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.style.display = 'none';
            return true;
        }
        
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            emailInput.classList.add('shake');
            setTimeout(() => emailInput.classList.remove('shake'), 500);
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        
        if (password === '') {
            passwordError.style.display = 'none';
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = '#ddd';
            strengthText.textContent = 'Password strength';
            return false;
        }
        
        if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordError.style.display = 'block';
            strengthBar.style.width = '30%';
            strengthBar.style.backgroundColor = '#e74c3c';
            strengthText.textContent = 'Weak';
            return false;
        } else {
            passwordError.style.display = 'none';
            
            // Check password strength
            let strength = 0;
            
            // Length gives points
            strength += Math.min(4, Math.floor(password.length / 2));
            
            // Mixed case gives points
            if (password.match(/[a-z]/)) strength += 1;
            if (password.match(/[A-Z]/)) strength += 1;
            
            // Numbers and special chars give points
            if (password.match(/\d/)) strength += 1;
            if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
            
            // Calculate percentage
            const percentage = Math.min(100, strength * 20);
            
            // Update strength bar
            strengthBar.style.width = `${percentage}%`;
            
            if (percentage < 50) {
                strengthBar.style.backgroundColor = '#e74c3c';
                strengthText.textContent = 'Weak';
            } else if (percentage < 80) {
                strengthBar.style.backgroundColor = '#f39c12';
                strengthText.textContent = 'Moderate';
            } else {
                strengthBar.style.backgroundColor = '#2ecc71';
                strengthText.textContent = 'Strong';
            }
            
            return true;
        }
    }
    
    // Form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            // Show success message
            formSuccess.style.display = 'block';
            userForm.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 3000);
        }
    });
});
const keypressInput = document.getElementById('keypress-input');
const keypressOutput = document.getElementById('keypress-output');

keypressInput.addEventListener('keydown', function(e) {
    const randomJjkChar = ['Gojo', 'Yuji', 'Megumi', 'Nobara', 'Sukuna'][Math.floor(Math.random() * 5)];
    const randomEmoji = ['🌀', '👊', '🐕', '🔨', '👁️'][Math.floor(Math.random() * 5)];
    
    keypressOutput.innerHTML = `
        <span>${randomEmoji}</span>
        <span><strong>${randomJjkChar}</strong> detected: "${e.key}" key pressed!</span>
        <span>${randomEmoji}</span>
    `;
    
    // Change border color when typing
    keypressInput.style.borderColor = '#ff4e50';
});

keypressInput.addEventListener('keyup', function() {
    keypressInput.style.borderColor = '#6e45e2';
});