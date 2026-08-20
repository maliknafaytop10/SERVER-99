document.addEventListener('DOMContentLoaded', () => {
    let state = {
        xp: 0,
        score: 0,
        streak: 0,
        lives: 3,
        hints: 3,
        profileCreated: false,
        theme: 'cream',
        brightness: 'normal',
        fps: 'auto',
        sound: true,
        music: false,
        vibration: true,
        notifications: true,
        spinLocked: false,
        lastSpinTime: 0
    };

    function loadState() {
        const saved = localStorage.getItem('nafay_servers_state');
        if (saved) {
            try { state = { ...state, ...JSON.parse(saved); } } catch(e){}
        }
        applyThemeAndSettings();
        updateUIStats();
    }

    function saveState() {
        localStorage.setItem('nafay_servers_state', JSON.stringify(state));
    }

    const navItems = document.querySelectorAll('.nav-item');
    const sections = {
        'home-section': document.getElementById('home-section'),
        'terms-section': document.getElementById('terms-section'),
        'profile-section': document.getElementById('profile-section'),
        'events-section': document.getElementById('events-section'),
        'gameplay-section': document.getElementById('gameplay-section')
    };

    function switchSection(targetId) {
        Object.values(sections).forEach(sec => sec.classList.add('hidden'));
        if (sections[targetId]) {
            sections[targetId].classList.remove('hidden');
        }
        navItems.forEach(item => {
            if (item.getAttribute('data-target') === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection(item.getAttribute('data-target'));
        });
    });

    const profileStatusBox = document.getElementById('profile-status-box');
    const profileDetailsBox = document.getElementById('profile-details-box');
    const createProfileBtn = document.getElementById('create-profile-btn');
    const notNowBtn = document.getElementById('not-now-btn');
    const logoutProfileBtn = document.getElementById('logout-profile-btn');

    function updateProfileView() {
        if (state.profileCreated) {
            profileStatusBox.classList.add('hidden');
            profileDetailsBox.classList.remove('hidden');
            document.getElementById('profile-xp').textContent = state.xp;
            document.getElementById('profile-badges').textContent = state.streak > 5 ? '5 Badges' : '1 Badge';
        } else {
            profileStatusBox.classList.remove('hidden');
            profileDetailsBox.classList.add('hidden');
        }
    }

    createProfileBtn.addEventListener('click', () => {
        state.profileCreated = true;
        saveState();
        updateProfileView();
        setAIMotivation('Profile created successfully! Welcome to the DeepX command center.');
    });

    notNowBtn.addEventListener('click', () => {
        switchSection('home-section');
    });

    logoutProfileBtn.addEventListener('click', () => {
        state.profileCreated = false;
        saveState();
        updateProfileView();
    });

    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const settingsOverlay = document.getElementById('settings-overlay');
    const closeSettings = document.getElementById('close-settings');
    const resetSettingsBtn = document.getElementById('reset-settings-btn');

    function toggleSettings(open) {
        if (open) {
            settingsPanel.classList.add('open');
            settingsOverlay.classList.remove('hidden');
        } else {
            settingsPanel.classList.remove('open');
            settingsOverlay.classList.add('hidden');
        }
    }

    settingsBtn.addEventListener('click', () => toggleSettings(true));
    closeSettings.addEventListener('click', () => toggleSettings(false));
    settingsOverlay.addEventListener('click', () => toggleSettings(false));

    const settingTheme = document.getElementById('setting-theme');
    const settingBrightness = document.getElementById('setting-brightness');
    const settingFps = document.getElementById('setting-fps');
    const settingSound = document.getElementById('setting-sound');
    const settingMusic = document.getElementById('setting-music');
    const settingVibration = document.getElementById('setting-vibration');
    const settingNotifications = document.getElementById('setting-notifications');

    function applyThemeAndSettings() {
        document.documentElement.setAttribute('data-theme', state.theme);
        document.documentElement.setAttribute('data-brightness', state.brightness);
        
        settingTheme.value = state.theme;
        settingBrightness.value = state.brightness;
        settingFps.value = state.fps;
        settingSound.checked = state.sound;
        settingMusic.checked = state.music;
        settingVibration.checked = state.vibration;
        settingNotifications.checked = state.notifications;
        
        updateProfileView();
    }

    settingTheme.addEventListener('change', (e) => {
        state.theme = e.target.value;
        saveState();
        applyThemeAndSettings();
    });

    settingBrightness.addEventListener('change', (e) => {
        state.brightness = e.target.value;
        saveState();
        applyThemeAndSettings();
    });

    settingFps.addEventListener('change', (e) => {
        state.fps = e.target.value;
        saveState();
    });

    settingSound.addEventListener('change', (e) => { state.sound = e.target.checked; saveState(); });
    settingMusic.addEventListener('change', (e) => { state.music = e.target.checked; saveState(); });
    settingVibration.addEventListener('change', (e) => { state.vibration = e.target.checked; saveState(); });
    settingNotifications.addEventListener('change', (e) => { state.notifications = e.target.checked; saveState(); });

    resetSettingsBtn.addEventListener('click', () => {
        localStorage.removeItem('nafay_servers_state');
        location.reload();
    });

    const playTriggers = document.querySelectorAll('.play-trigger');
    const backToHome = document.getElementById('back-to-home');
    const categoryContainer = document.getElementById('category-container');
    const quizBox = document.getElementById('quiz-box');
    const spinnerBox = document.getElementById('spinner-box');
    const motivationText = document.getElementById('motivation-text');

    let currentGameMode = null;
    let activeQuestions = [];
    let currentQuestionIndex = 0;
    let quizTimer = null;
    let timeLeft = 15;

    function setAIMotivation(msg) {
        motivationText.textContent = msg;
    }

    playTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-game');
            currentGameMode = mode;
            switchSection('gameplay-section');
            initGameMode(mode);
        });
    });

    backToHome.addEventListener('click', () => {
        clearInterval(quizTimer);
        switchSection('home-section');
    });

    function initGameMode(mode) {
        categoryContainer.classList.add('hidden');
        quizBox.classList.add('hidden');
        spinnerBox.classList.add('hidden');

        if (mode === 'choose-your') {
            activeQuestions = shuffleArray([...CHOOSE_YOUR_QUESTIONS]);
            startQuizFlow();
        } else if (mode === 'fo4r-chance') {
            categoryContainer.classList.remove('hidden');
            setAIMotivation('Choose an MCQ category to begin testing your knowledge.');
        } else if (mode === 'your-luck') {
            spinnerBox.classList.remove('hidden');
            setupSpinnerWheel();
            setAIMotivation('Spin the wheel to test your destiny!');
        }
    }

    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-cat');
            if (cat === 'animals') activeQuestions = shuffleArray([...ANIMALS_QUESTIONS]);
            if (cat === 'cars') activeQuestions = shuffleArray([...CARS_QUESTIONS]);
            if (cat === 'internet') activeQuestions = shuffleArray([...INTERNET_QUESTIONS]);
            if (cat === 'islam') activeQuestions = shuffleArray([...ISLAM_QUESTIONS]);
            
            categoryContainer.classList.add('hidden');
            startQuizFlow();
        });
    });

    function startQuizFlow() {
        currentQuestionIndex = 0;
        quizBox.classList.remove('hidden');
        loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestionIndex >= activeQuestions.length) {
            quizBox.innerHTML = `<h3>🎉 Quiz Completed!</h3><p>Fantastic job completing all questions in this session.</p>`;
            state.xp += 100;
            saveState();
            updateUIStats();
            setAIMotivation('Quiz complete! Outstanding performance across the board.');
            return;
        }

        const q = activeQuestions[currentQuestionIndex];
        document.getElementById('question-text').textContent = q.question;
        
        const optionsGrid = document.getElementById('options-grid');
        optionsGrid.innerHTML = '';

        q.options.forEach((optText, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = optText;
            btn.addEventListener('click', () => handleAnswerSelection(idx, q.correctIndex, btn));
            optionsGrid.appendChild(btn);
        });

        updateProgressBar();
        startTimer();
    }

    function handleAnswerSelection(selectedIndex, correctIndex, btnElement) {
        clearInterval(quizTimer);
        const options = document.querySelectorAll('.option-btn');
        options.forEach(o => o.style.pointerEvents = 'none');

        if (currentGameMode === 'choose-your') {
            btnElement.classList.add('correct');
            state.score += 10;
            state.xp += 15;
            state.streak++;
            setAIMotivation('Great choice! Every preference makes your profile unique.');
        } else {
            if (selectedIndex === correctIndex) {
                btnElement.classList.add('correct');
                state.score += 20;
                state.xp += 30;
                state.streak++;
                setAIMotivation('Correct answer! Your knowledge shines.');
            } else {
                btnElement.classList.add('wrong');
                options[correctIndex].classList.add('correct');
                state.streak = 0;
                state.lives = Math.max(0, state.lives - 1);
                setAIMotivation('Incorrect! Keep your focus for the next challenge.');
            }
        }

        saveState();
        updateUIStats();

        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1200);
    }

    function startTimer() {
        clearInterval(quizTimer);
        timeLeft = 15;
        const timeDisplay = document.getElementById('time-left');
        const timerBadge = document.querySelector('.timer-badge');
        timerBadge.className = 'timer-badge';

        quizTimer = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            if (timeLeft <= 5 && timeLeft > 3) {
                timerBadge.classList.add('pulse-gentle');
            } else if (timeLeft <= 3) {
                timerBadge.classList.remove('pulse-gentle');
                timerBadge.classList.add('pulse-strong');
            }
            if (timeLeft <= 0) {
                clearInterval(quizTimer);
                currentQuestionIndex++;
                loadQuestion();
            }
        }, 1000);
    }

    function updateProgressBar() {
        const pct = ((currentQuestionIndex) / activeQuestions.length) * 100;
        document.getElementById('quiz-progress-bar').style.width = pct + '%';
    }

    function updateUIStats() {
        document.getElementById('user-xp').textContent = state.xp;
        document.getElementById('user-score').textContent = state.score;
        document.getElementById('streak-count').textContent = state.streak;
        document.getElementById('lives-count').textContent = state.lives;
    }

    function setupSpinnerWheel() {
        const wheel = document.getElementById('wheel');
        const spinBtn = document.getElementById('spin-btn');
        const spinResult = document.getElementById('spin-result');
        spinResult.classList.add('hidden');

        wheel.innerHTML = '';
        const optionsList = SPINNER_OPTIONS_DATA.slice(0, 8);
        const angleStep = 360 / optionsList.length;

        optionsList.forEach((item, index) => {
            const seg = document.createElement('div');
            seg.className = 'wheel-segment';
            seg.textContent = item;
            seg.style.transform = `rotate(${index * angleStep}deg) skewY(${90 - angleStep}deg)`;
            wheel.appendChild(seg);
        });

        spinBtn.onclick = () => {
            spinBtn.disabled = true;
            const randomRotation = 1800 + Math.floor(Math.random() * 360);
            wheel.style.transform = `rotate(${randomRotation}deg)`;

            setTimeout(() => {
                const winningIndex = Math.floor((randomRotation % 360) / angleStep);
                const resultText = optionsList[winningIndex];
                spinResult.textContent = `🎉 Result: ${resultText}`;
                spinResult.classList.remove('hidden');
                state.xp += 50;
                saveState();
                updateUIStats();
                setAIMotivation(`Spin result locked: ${resultText}! Wonderful reward unlocked.`);
                spinBtn.disabled = false;
            }, 4000);
        };
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    loadState();
});
