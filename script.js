class BlackjackGame {
    constructor() {
        this.deck = [];
        this.playerHands = [[]]; // Support multiple hands for splits
        this.dealerHand = [];
        this.balance = 500;
        this.currentBets = [0]; // Bets for each hand
        this.gameInProgress = false;
        this.dealerHidden = true;
        this.currentHandIndex = 0;
        this.handsCompleted = [];
        this.canSplit = false;
        this.canSurrender = true;
        this.vipLevel = 1;
        this.totalWagered = 0;
        this.gamesPlayed = 0;
        // Game statistics tracking
        this.gamesWon = 0;
        this.gamesLost = 0;
        this.gamesPushed = 0;
        this.dealerPersonality = this.selectDealerPersonality();

        // Loan system
        this.loanAmount = 0;
        this.loanTaken = false;
        this.gamesWithLoan = 0;
        this.maxLoanGames = 8;

        // Tipping system
        this.dealerTipped = false;
        this.tipAmount = 0;
        this.tipsGiven = 0;

        // Psychological manipulation systems
        this.losingStreak = 0;
        this.winningStreak = 0;
        this.tableTemperature = 'neutral'; // hot, cold, neutral
        this.temperatureCounter = 0;
        this.hasLuckyCharm = false;
        this.lastGameResult = null;

        // New psychological manipulation features
        this.isNewPlayer = this.gamesPlayed < 5; // Beginner's luck system
        this.subliminalMessageActive = false;
        this.fakeSpectators = [
            "PlayerPro2024", "LuckyLady88", "CardShark99", "VegasVet", "HighRoller23",
            "BlackjackBoss", "CasinoKing", "AceHunter", "DealerSlayer", "ChipCollector"
        ];
        this.spectatorComments = {
            badPlay: [
                "Seriously? That was a terrible move.",
                "I would never hit on that hand.",
                "This player doesn't know basic strategy.",
                "Rookie mistake right there.",
                "That's why I'm up $5000 tonight.",
                "Should have stood on that one.",
                "Amateur hour over here.",
                "I've been watching and this player is hopeless.",
                "That's not how you play blackjack.",
                "Someone needs to learn the rules."
            ],
            goodPlay: [
                "Nice play, but you got lucky.",
                "Even a broken clock is right twice a day.",
                "Finally made a decent decision.",
                "That was obvious though.",
                "I would have done the same thing.",
                "Basic strategy, nothing special.",
                "Still down overall though.",
                "One good hand doesn't make you a pro.",
                "Don't let it go to your head.",
                "You're still learning."
            ],
            losing: [
                "Ouch, that's gotta hurt.",
                "I saw that coming a mile away.",
                "This is painful to watch.",
                "Maybe try a different table?",
                "The house always wins in the end.",
                "Cut your losses and walk away.",
                "This isn't your night.",
                "I'd quit while you're behind.",
                "Some people just don't have it.",
                "Maybe stick to slots?"
            ]
        };

        // Shop inventory system
        this.inventory = {
            'rabbit-foot': 0,
            'clover': 0,
            'evil-eye': 0,
            'fortune': 0,
            'blessing': 0,
            'hotstreak': 0,
            'breaker': 0
        };

        // Slots system - MUST match paytable exactly
        this.slotSymbols = ['🍒', '🍊', '🔔', '⭐', '7️⃣', '💎'];
        this.totalSpins = 0;
        this.lastSlotWin = 0;
        this.jackpotAmount = 999999;
        this.blackjackWinnings = 0; // Track winnings for bonus unlocks

        // Slot machine odds (adjustable via dev tab)
        this.slotOdds = {
            jackpot: 0.005,    // 0.5% (5x increase)
            bigWin: 0.03,      // 3% (3x increase)
            mediumWin: 0.08,   // 8% (2x increase)
            smallWin: 0.25     // 25% (1.67x increase)
        };

        // Theme system
        this.currentTheme = 'tavern';
        this.currentCards = 'classic';
        this.unlockedThemes = ['tavern'];
        this.unlockedCards = ['classic'];
        this.themesEnabled = true; // Add theme enable/disable system

        // Track if VIP level was artificially loaded (higher than balance would allow)
        this.vipLevelOverride = false;

        // Ultra-obscure developer access - requires specific knowledge
        this.devTabUnlocked = false;
        this.secretActions = [];
        this.mouseClicks = [];
        this.lastKeyTime = 0;
        this.accessPhase = 0;

        this.initializeElements();
        this.attachEventListeners();
        this.updateBalance();
        this.updateVIPStatus();
        this.updateLoanStatus();
        this.updateTipStatus();
        this.updateStreakCounter();
        this.updateTableTemperature();
        this.updateInventoryDisplay();

        // Initialize tab system - ensure game tab is active and shop is hidden
        setTimeout(() => {
            this.initializeTabs();
            // Apply initial theme
            this.applyTheme(this.currentTheme);
        }, 100);

        // Start periodic subliminal message system
        this.startSubliminalSystem();

        // Add secret key listener for Dev tab
        this.setupSecretAccess();

        // Add Houdini easter egg listener
        this.setupHoudiniEasterEgg();
        this.showDealerGreeting();

        // Check for lockdown on load
        this.checkLockdown();

        // Initialize enhanced UI elements
        setTimeout(() => {
            this.updateDealerMood();
            this.updateTableActivity();
            this.updateLuckyCharms();
            this.addCasinoAmbiance();
            this.addFloatingChips();
        }, 1000);

        // Initialize save codes
        setTimeout(() => {
            // Clear any existing lockdown for testing
            localStorage.removeItem('blackjack_lockdown');
            localStorage.removeItem('blackjack_debt');

            // Create Diamond level code
            const diamondData = {
                balance: 250000,
                vipLevel: 9,
                totalWagered: 500000,
                gamesPlayed: 100
            };
            localStorage.setItem('blackjack_save_DIAM9000', JSON.stringify(diamondData));

            // Create Ruby level code  
            const rubyData = {
                balance: 500000,
                vipLevel: 11,
                totalWagered: 1000000,
                gamesPlayed: 150
            };
            localStorage.setItem('blackjack_save_RUBY1100', JSON.stringify(rubyData));

            // Create Legendary level code
            const legendData = {
                balance: 8000000,
                vipLevel: 20,
                totalWagered: 16000000,
                gamesPlayed: 500
            };
            localStorage.setItem('blackjack_save_LEGE2000', JSON.stringify(legendData));

            // Create Mythical level code
            const mythicalData = {
                balance: 15000000,
                vipLevel: 21,
                totalWagered: 30000000,
                gamesPlayed: 750
            };
            localStorage.setItem('blackjack_save_MYTH2100', JSON.stringify(mythicalData));

            // Create Divine level code
            const divineData = {
                balance: 50000000,
                vipLevel: 25,
                totalWagered: 100000000,
                gamesPlayed: 1000
            };
            localStorage.setItem('blackjack_save_DIVI2500', JSON.stringify(divineData));

            // Create Cosmic level code
            const cosmicData = {
                balance: 750000000,
                vipLevel: 31,
                totalWagered: 1500000000,
                gamesPlayed: 1500
            };
            localStorage.setItem('blackjack_save_COSM3100', JSON.stringify(cosmicData));

            // Create APEX level code
            const apexData = {
                balance: 2500000000,
                vipLevel: 40,
                totalWagered: 5000000000,
                gamesPlayed: 2000
            };
            localStorage.setItem('blackjack_save_APEX4000', JSON.stringify(apexData));
        }, 500);
    }
    initializeElements() {
        this.balanceEl = document.getElementById('balance');
        this.betAmountEl = document.getElementById('bet-amount');
        this.dealBtn = document.getElementById('deal-btn');
        this.hitBtn = document.getElementById('hit-btn');
        this.standBtn = document.getElementById('stand-btn');
        this.doubleBtn = document.getElementById('double-btn');
        this.splitBtn = document.getElementById('split-btn');
        this.surrenderBtn = document.getElementById('surrender-btn');
        this.dealerCardsEl = document.getElementById('dealer-cards');
        this.playerCardsEl = document.getElementById('player-cards');
        this.dealerScoreEl = document.getElementById('dealer-score');
        this.playerScoreEl = document.getElementById('player-score');
        this.messageEl = document.getElementById('game-message');
        this.vipLevelEl = document.getElementById('vip-level');
        this.dealerCommentEl = document.getElementById('dealer-comment');
        this.chipsEl = document.getElementById('chips-display');
        this.deckEl = document.getElementById('deck');
        this.vipProgressEl = document.getElementById('vip-progress');
        this.betLimitEl = document.getElementById('bet-limit');
        this.saveBtn = document.getElementById('dev-save-btn');
        this.loadBtn = document.getElementById('dev-load-btn');
        this.loadCodeEl = document.getElementById('dev-load-code');
        this.loanBtn = document.getElementById('loan-btn');
        this.repayBtn = document.getElementById('repay-btn');
        this.loanStatusEl = document.getElementById('loan-status');
        this.lockdownOverlay = document.getElementById('lockdown-overlay');
        this.lockdownDebtEl = document.getElementById('lockdown-debt');
        this.tipBtn = document.getElementById('tip-btn');
        this.tipStatusEl = document.getElementById('tip-status');

        // Psychological manipulation elements
        this.streakCounterEl = document.getElementById('streak-counter');
        this.tableTemperatureEl = document.getElementById('table-temperature');
        this.nearMissEl = document.getElementById('near-miss');
        this.spectatorCommentsEl = document.getElementById('spectator-comments');
        this.subliminalFlashEl = document.getElementById('subliminal-flash');

        // Tab system elements
        this.gameTabBtn = document.getElementById('game-tab');
        this.shopTabBtn = document.getElementById('shop-tab');
        this.bankTabBtn = document.getElementById('bank-tab');
        this.slotsTabBtn = document.getElementById('slots-tab');
        this.themesTabBtn = document.getElementById('themes-tab');
        this.rouletteTabBtn = document.getElementById('roulette-tab');
        this.devTabBtn = document.getElementById('dev-tab');
        this.gameContent = document.getElementById('game-content');
        this.shopContent = document.getElementById('shop-content');
        this.bankContent = document.getElementById('bank-content');
        this.slotsContent = document.getElementById('slots-content');
        this.rouletteContent = document.getElementById('roulette-content');
        this.themesContent = document.getElementById('themes-content');
        this.devContent = document.getElementById('dev-content');
        this.inventoryList = document.getElementById('inventory-list');
    }

    attachEventListeners() {
        this.dealBtn.addEventListener('click', () => this.startNewGame());
        this.hitBtn.addEventListener('click', () => this.hit());
        this.standBtn.addEventListener('click', () => this.stand());
        this.doubleBtn.addEventListener('click', () => this.doubleDown());
        this.splitBtn.addEventListener('click', () => this.split());
        this.surrenderBtn.addEventListener('click', () => this.surrender());
        this.saveBtn.addEventListener('click', () => this.saveProgress());
        this.loadBtn.addEventListener('click', () => this.loadProgress());
        this.loanBtn.addEventListener('click', () => this.takeLoan());
        this.repayBtn.addEventListener('click', () => this.repayLoan());
        this.tipBtn.addEventListener('click', () => this.tipDealer());

        // Tab system listeners
        this.gameTabBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchTab('game');
        });
        this.shopTabBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchTab('shop');
        });
        this.bankTabBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchTab('bank');
        });
        this.slotsTabBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchTab('slots');
        });
        this.rouletteTabBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchTab('roulette');
        });
        this.themesTabBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchTab('themes');
        });
        this.devTabBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchTab('dev');
        });

        // Set up shop listeners after DOM is ready
        setTimeout(() => this.setupShopListeners(), 100);
        setTimeout(() => this.setupSlotsListeners(), 100);
        setTimeout(() => this.setupRouletteListeners(), 100);
        setTimeout(() => this.setupThemesListeners(), 100);
        setTimeout(() => this.setupDevListeners(), 100);
    }

    setupShopListeners() {
        // Shop item listeners - set up after DOM is ready
        const shopButtons = [
            { id: 'shop-charm-btn', item: 'rabbit-foot', price: 50 },
            { id: 'shop-clover-btn', item: 'clover', price: 100 },
            { id: 'shop-eye-btn', item: 'evil-eye', price: 75 },
            { id: 'shop-fortune-btn', item: 'fortune', price: 25 },
            { id: 'shop-blessing-btn', item: 'blessing', price: 40 },
            { id: 'shop-hotstreak-btn', item: 'hotstreak', price: 60 },
            { id: 'shop-breaker-btn', item: 'breaker', price: 80 }
        ];

        shopButtons.forEach(button => {
            const element = document.getElementById(button.id);
            if (element) {
                element.addEventListener('click', () => {
                    this.buyShopItem(button.item, button.price);
                });
            }
        });
    }

    createDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.deck = [];

        for (let suit of suits) {
            for (let rank of ranks) {
                this.deck.push({
                    suit: suit,
                    rank: rank,
                    value: this.getCardValue(rank)
                });
            }
        }
        this.shuffleDeck();
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    getCardValue(rank) {
        if (rank === 'A') return 11;
        if (['J', 'Q', 'K'].includes(rank)) return 10;
        return parseInt(rank);
    }

    dealCard() {
        // Check if deck is empty and create new one if needed
        if (this.deck.length === 0) {
            this.createDeck();
        }

        let card = this.deck.pop();

        // Safety check - if card is still undefined, create a new deck
        if (!card) {
            this.createDeck();
            card = this.deck.pop();
        }

        return card;
    }

    calculateHandValue(hand) {
        let value = 0;
        let aces = 0;

        for (let card of hand) {
            value += card.value;
            if (card.rank === 'A') aces++;
        }

        while (value > 21 && aces > 0) {
            value -= 10;
            aces--;
        }

        return value;
    }
    startNewGame() {
        const betAmount = parseInt(this.betAmountEl.value);

        if (betAmount > this.balance) {
            this.showMessage('Insufficient funds!', 'lose');
            return;
        }

        if (betAmount < 10) {
            this.showMessage('Minimum bet is $10!', 'lose');
            return;
        }

        // Check VIP betting limits (Legendary+ has no limits)
        if (this.vipLevel < 40) {
            const maxBets = [
                5000, 10000, 25000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000,
                10000000, 25000000, 50000000, 100000000, 250000000, 500000000, 1000000000, 2500000000, 5000000000, 10000000000,
                25000000000, 50000000000, 100000000000, 250000000000, 500000000000, 1000000000000, 2500000000000, 5000000000000, 10000000000000, 25000000000000,
                50000000000000, 100000000000000, 250000000000000, 500000000000000, 1000000000000000, 2500000000000000, 5000000000000000, 10000000000000000, 25000000000000000
            ];
            const vipLimit = maxBets[this.vipLevel - 1];
            if (betAmount > vipLimit) {
                const vipNames = [
                    'Bronze', 'Bronze+', 'Silver', 'Silver+', 'Gold', 'Gold+',
                    'Platinum', 'Platinum+', 'Diamond', 'Diamond+', 'Ruby', 'Ruby+',
                    'Emerald', 'Emerald+', 'Sapphire', 'Sapphire+', 'Elite', 'Elite+',
                    'Legendary', 'Legendary+', 'Mythical', 'Mythical+', 'Celestial', 'Celestial+',
                    'Divine', 'Divine+', 'Transcendent', 'Transcendent+', 'Omnipotent', 'Omnipotent+',
                    'Cosmic', 'Cosmic+', 'Universal', 'Universal+', 'Infinite', 'Infinite+',
                    'Eternal', 'Eternal+', 'Godlike', 'APEX'
                ];
                this.showMessage(`VIP ${vipNames[this.vipLevel - 1]} limit is ${vipLimit.toLocaleString()}!`, 'lose');
                return;
            }
        }

        // Reset for new game
        this.playerHands = [[]];
        this.currentBets = [betAmount];
        this.currentHandIndex = 0;
        this.handsCompleted = [];
        this.canSurrender = true;
        this.balance -= betAmount;
        this.totalWagered += betAmount;

        this.updateBalance();
        this.updateVIPStatus(); // Allow recalculation for natural progression
        this.checkLoanProgress();

        this.createDeck();
        this.dealerHand = [];
        this.dealerHidden = true;
        this.gameInProgress = true;

        // Deal initial cards with animation
        this.dealInitialCards();
    }

    dealInitialCards() {
        // Deal all cards instantly
        this.playerHands[0].push(this.dealCard());
        this.dealerHand.push(this.dealCard());
        this.playerHands[0].push(this.dealCard());
        this.dealerHand.push(this.dealCard());

        // Update display immediately
        this.updateDisplay();

        // Enable controls
        this.enableGameControls();

        // Check for blackjack
        if (this.calculateHandValue(this.playerHands[0]) === 21) {
            this.checkForBlackjack();
        } else {
            this.checkSplitOptions();
        }

        this.clearMessage();
    }

    updateDisplay() {
        // Update player cards - support multiple hands
        this.playerCardsEl.innerHTML = '';

        if (this.playerHands.length === 1) {
            // Single hand display
            this.playerHands[0].forEach(card => {
                const cardEl = this.createCardElement(card);
                this.playerCardsEl.appendChild(cardEl);
            });
            this.playerScoreEl.textContent = `(${this.calculateHandValue(this.playerHands[0])})`;
        } else {
            // Multiple hands display
            this.playerHands.forEach((hand, index) => {
                const handContainer = document.createElement('div');
                handContainer.className = `player-hand ${index === this.currentHandIndex ? 'active' : ''}`;
                handContainer.setAttribute('data-hand-number', index + 1);

                hand.forEach(card => {
                    const cardEl = this.createCardElement(card);
                    handContainer.appendChild(cardEl);
                });

                const scoreEl = document.createElement('div');
                scoreEl.className = 'hand-score';
                scoreEl.textContent = `(${this.calculateHandValue(hand)})`;
                handContainer.appendChild(scoreEl);

                this.playerCardsEl.appendChild(handContainer);
            });
            this.playerScoreEl.textContent = '';
        }

        // Update dealer cards
        this.dealerCardsEl.innerHTML = '';
        this.dealerHand.forEach((card, index) => {
            const hidden = this.dealerHidden && index === 1;
            const cardEl = this.createCardElement(card, hidden);
            this.dealerCardsEl.appendChild(cardEl);
        });

        // Update dealer score
        if (this.dealerHidden) {
            this.dealerScoreEl.textContent = `(${this.dealerHand[0].value})`;
        } else {
            this.dealerScoreEl.textContent = `(${this.calculateHandValue(this.dealerHand)})`;
        }
    }

    createCardElement(card, hidden = false) {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';

        // Apply current card design theme
        if (this.currentCards && this.currentCards !== 'classic') {
            cardEl.classList.add(`${this.currentCards}-design`);
        }

        if (hidden) {
            cardEl.classList.add('hidden');
            cardEl.innerHTML = '<div class="rank">?</div><div class="suit">?</div>';
        } else {
            if (card.suit === '♥' || card.suit === '♦') {
                cardEl.classList.add('red');
            }
            cardEl.innerHTML = `
                <div class="rank">${card.rank}</div>
                <div class="suit">${card.suit}</div>
            `;
        }

        return cardEl;
    }

    hit() {
        if (!this.gameInProgress) return;

        const currentHand = this.playerHands[this.currentHandIndex];
        currentHand.push(this.dealCard());
        this.updateDisplay();

        this.canSurrender = false;

        const playerValue = this.calculateHandValue(currentHand);
        if (playerValue > 21) {
            this.completeCurrentHand();
        } else if (playerValue === 21) {
            this.completeCurrentHand();
        }

        this.checkSplitOptions();
        if (this.doubleBtn) this.doubleBtn.disabled = true;
        if (this.surrenderBtn) this.surrenderBtn.disabled = true;
    }

    stand() {
        if (!this.gameInProgress) return;
        this.disableGameControls();
        this.completeCurrentHand();
    }

    completeCurrentHand() {
        this.handsCompleted[this.currentHandIndex] = true;

        // Move to next hand if available
        this.currentHandIndex++;
        if (this.currentHandIndex < this.playerHands.length) {
            this.updateDisplay();
            this.enableGameControls();
            this.checkSplitOptions();
            return;
        }

        // All hands completed, play dealer
        this.playDealer();
    }

    playDealer() {
        this.dealerHidden = false;
        this.updateDisplay();

        // Dealer must hit on 16 and stand on 17
        this.dealerDrawCards();
    }

    dealerDrawCards() {
        // Draw all dealer cards instantly
        while (this.calculateHandValue(this.dealerHand) < 17) {
            this.dealerHand.push(this.dealCard());
        }

        this.updateDisplay();
        this.determineAllWinners();
    }

    doubleDown() {
        const currentHand = this.playerHands[this.currentHandIndex];
        const currentBet = this.currentBets[this.currentHandIndex];

        if (!this.gameInProgress || currentHand.length !== 2) return;

        if (currentBet > this.balance) {
            this.showMessage('Insufficient balance to double down!', 'lose');
            return;
        }

        this.balance -= currentBet;
        this.currentBets[this.currentHandIndex] *= 2;
        this.totalWagered += currentBet;
        this.updateBalance();

        this.hit();

        if (this.gameInProgress && this.calculateHandValue(currentHand) <= 21) {
            this.completeCurrentHand();
        }
    }

    checkForBlackjack() {
        const playerBlackjack = this.calculateHandValue(this.playerHands[0]) === 21;
        const dealerBlackjack = this.calculateHandValue(this.dealerHand) === 21;

        if (playerBlackjack && dealerBlackjack) {
            this.dealerHidden = false;
            this.updateDisplay();
            // Push - return the bet
            this.balance += this.currentBets[0];
            this.endGame('push');
        } else if (playerBlackjack) {
            this.dealerHidden = false;
            this.updateDisplay();
            // Blackjack pays 3:2 (1.5x the bet) plus the original bet back
            const blackjackPayout = Math.floor(this.currentBets[0] * 1.5) + this.currentBets[0];
            this.balance += blackjackPayout;
            this.endGame('blackjack');
        }
    }

    determineAllWinners() {
        const dealerValue = this.calculateHandValue(this.dealerHand);
        let totalWinnings = 0;
        let results = [];

        for (let i = 0; i < this.playerHands.length; i++) {
            const playerValue = this.calculateHandValue(this.playerHands[i]);
            const bet = this.currentBets[i];
            let result = '';
            let winnings = 0;

            if (playerValue > 21) {
                result = 'bust';
                winnings = 0;
            } else if (dealerValue > 21) {
                result = 'dealer-bust';
                winnings = bet * 2;
            } else if (playerValue > dealerValue) {
                result = 'win';
                winnings = bet * 2;
            } else if (playerValue < dealerValue) {
                result = 'lose';
                winnings = 0;
            } else {
                result = 'push';
                winnings = bet;
            }

            totalWinnings += winnings;
            results.push({ result, winnings, hand: i + 1 });
        }

        this.balance += totalWinnings;
        this.endGame(results);
    }

    endGame(results) {
        this.gameInProgress = false;
        this.disableGameControls();

        if (Array.isArray(results)) {
            // Multiple hands
            let message = '';
            let overallResult = 'lose';
            let totalWon = 0;

            results.forEach((handResult, index) => {
                const bet = this.currentBets[index];
                if (handResult.winnings >= bet) {
                    totalWon += handResult.winnings;
                    if (overallResult === 'lose') overallResult = 'win';
                }
            });

            if (totalWon > 0) {
                // Check if any wins were due to dealer bust
                let dealerBustWins = results.filter(r => r.result === 'dealer-bust').length;
                if (dealerBustWins > 0) {
                    message = `Dealer busts! Won $${totalWon.toLocaleString()}!`;
                } else {
                    message = `Won $${totalWon.toLocaleString()}!`;
                }
                this.showMessage(message, 'win');
            } else {
                // Determine why player lost based on results
                let dealerBustCount = 0;
                let playerBustCount = 0;
                let loseCount = 0;
                let pushCount = 0;

                results.forEach((handResult) => {
                    switch (handResult.result) {
                        case 'dealer-bust':
                            dealerBustCount++;
                            break;
                        case 'bust':
                            playerBustCount++;
                            break;
                        case 'lose':
                            loseCount++;
                            break;
                        case 'push':
                            pushCount++;
                            break;
                    }
                });

                if (pushCount === results.length) {
                    message = 'Push - all hands tied!';
                    this.showMessage(message, 'push');
                } else if (playerBustCount === results.length) {
                    message = 'You bust!';
                    this.showMessage(message, 'lose');
                } else if (playerBustCount > 0 && playerBustCount < results.length) {
                    message = `${playerBustCount} hand${playerBustCount > 1 ? 's' : ''} bust, ${loseCount} lost to dealer`;
                    this.showMessage(message, 'lose');
                } else {
                    message = 'Dealer wins!';
                    this.showMessage(message, 'lose');
                }
            }
        } else {
            // Single result
            this.showMessage(this.getResultMessage(results), results);
        }

        this.updateBalance();
        this.updateVIPStatus(); // Allow recalculation for natural progression
        this.gamesPlayed++;

        // Track win/loss statistics
        this.trackGameResult(results);

        // Show dealer comment based on result
        this.showDealerResultComment(results);
    }

    getResultMessage(result) {
        switch (result) {
            case 'win': return 'You win!';
            case 'lose': return 'Dealer wins!';
            case 'push': return 'Push - tie game!';
            case 'blackjack': return 'Blackjack! You win!';
            case 'bust': return 'Bust! You lose!';
            case 'dealer-bust': return 'Dealer busts! You win!';
            default: return 'Game over!';
        }
    }
    enableGameControls() {
        if (this.hitBtn) this.hitBtn.disabled = false;
        if (this.standBtn) this.standBtn.disabled = false;
        if (this.doubleBtn) this.doubleBtn.disabled = false;
        if (this.splitBtn) this.splitBtn.disabled = false;
        if (this.surrenderBtn) this.surrenderBtn.disabled = false;
    }

    disableGameControls() {
        if (this.hitBtn) this.hitBtn.disabled = true;
        if (this.standBtn) this.standBtn.disabled = true;
        if (this.doubleBtn) this.doubleBtn.disabled = true;
        if (this.splitBtn) this.splitBtn.disabled = true;
        if (this.surrenderBtn) this.surrenderBtn.disabled = true;
    }

    checkSplitOptions() {
        const currentHand = this.playerHands[this.currentHandIndex];

        if (currentHand.length === 2 &&
            currentHand[0].rank === currentHand[1].rank &&
            this.playerHands.length < 4) {
            this.canSplit = true;
            if (this.splitBtn) this.splitBtn.disabled = false;
        } else {
            this.canSplit = false;
            if (this.splitBtn) this.splitBtn.disabled = true;
        }
    }

    split() {
        if (!this.canSplit) return;

        const currentHand = this.playerHands[this.currentHandIndex];
        const currentBet = this.currentBets[this.currentHandIndex];

        if (currentBet > this.balance) {
            this.showMessage('Insufficient balance to split!', 'lose');
            return;
        }

        // Create new hand with second card
        const newHand = [currentHand.pop()];
        this.playerHands.push(newHand);
        this.currentBets.push(currentBet);

        // Deduct bet for split
        this.balance -= currentBet;
        this.totalWagered += currentBet;
        this.updateBalance();

        // Deal new cards to both hands
        this.playerHands[this.currentHandIndex].push(this.dealCard());
        newHand.push(this.dealCard());

        this.updateDisplay();
        this.checkSplitOptions();
    }

    surrender() {
        if (!this.canSurrender || this.playerHands[0].length !== 2) return;

        // Return half the bet
        const halfBet = Math.floor(this.currentBets[0] / 2);
        this.balance += halfBet;

        this.showMessage(`Surrendered! Returned $${halfBet}`, 'push');
        this.gameInProgress = false;
        this.disableGameControls();
        this.updateBalance();
    }

    showMessage(message, type = '') {
        if (this.messageEl) {
            this.messageEl.textContent = message;
            this.messageEl.className = `message ${type}`;
        }
    }

    clearMessage() {
        if (this.messageEl) {
            this.messageEl.textContent = '';
            this.messageEl.className = 'message';
        }
    }

    updateBalance() {
        if (this.balanceEl) {
            this.balanceEl.textContent = this.balance.toLocaleString();
        }

        // Check for VIP level progression whenever balance changes
        this.updateVIPStatus();

        // Update session stats
        this.updateSessionStats();
    }

    updateSessionStats() {
        const gamesPlayedEl = document.getElementById('games-played');
        const winRateEl = document.getElementById('win-rate');
        const gamesWonEl = document.getElementById('games-won');
        const gamesLostEl = document.getElementById('games-lost');

        if (gamesPlayedEl) {
            gamesPlayedEl.textContent = (this.gamesPlayed || 0).toLocaleString();
        }

        if (gamesWonEl) {
            gamesWonEl.textContent = (this.gamesWon || 0).toLocaleString();
        }

        if (gamesLostEl) {
            gamesLostEl.textContent = (this.gamesLost || 0).toLocaleString();
        }

        if (winRateEl && this.gamesPlayed > 0) {
            // Calculate actual win rate based on tracked wins/losses
            const winRate = ((this.gamesWon || 0) / this.gamesPlayed) * 100;
            winRateEl.textContent = `${Math.round(winRate)}%`;

            // Add color coding based on win rate
            if (winRate >= 60) {
                winRateEl.style.color = '#90EE90'; // Light green for good win rate
            } else if (winRate >= 45) {
                winRateEl.style.color = '#FFD700'; // Gold for average win rate
            } else {
                winRateEl.style.color = '#FFB6C1'; // Light red for poor win rate
            }
        } else if (winRateEl) {
            winRateEl.textContent = '0%';
            winRateEl.style.color = '#FFD700';
        }

        // Update spectator count
        this.updateSpectatorCount();
    }

    trackGameResult(results) {
        if (Array.isArray(results)) {
            // Multiple hands - determine overall result
            let totalWon = 0;
            let totalBet = 0;
            let pushCount = 0;

            results.forEach((handResult, index) => {
                const bet = this.currentBets[index];
                totalBet += bet;
                totalWon += handResult.winnings;

                if (handResult.result === 'push') {
                    pushCount++;
                }
            });

            if (pushCount === results.length) {
                this.gamesPushed++;
            } else if (totalWon > totalBet) {
                this.gamesWon++;
            } else {
                this.gamesLost++;
            }
        } else {
            // Single result
            switch (results) {
                case 'win':
                case 'blackjack':
                case 'dealer-bust':
                    this.gamesWon++;
                    break;
                case 'push':
                    this.gamesPushed++;
                    break;
                case 'lose':
                case 'bust':
                default:
                    this.gamesLost++;
                    break;
            }
        }
    }

    updateSpectatorCount() {
        const spectatorCountEl = document.getElementById('spectators-count');
        if (spectatorCountEl) {
            const count = Math.floor(Math.random() * 5) + 2; // 2-6 spectators
            spectatorCountEl.textContent = `${count} watching`;
        }
    }

    updateVIPDisplay() {
        const vipNames = [
            'Bronze', 'Bronze+', 'Silver', 'Silver+', 'Gold', 'Gold+',
            'Platinum', 'Platinum+', 'Diamond', 'Diamond+', 'Ruby', 'Ruby+',
            'Emerald', 'Emerald+', 'Sapphire', 'Sapphire+', 'Elite', 'Elite+',
            'Legendary', 'Legendary+', 'Mythical', 'Mythical+', 'Celestial', 'Celestial+',
            'Divine', 'Divine+', 'Transcendent', 'Transcendent+', 'Omnipotent', 'Omnipotent+',
            'Cosmic', 'Cosmic+', 'Universal', 'Universal+', 'Infinite', 'Infinite+',
            'Eternal', 'Eternal+', 'Godlike', 'APEX'
        ];

        const vipThresholds = [
            0, 2000, 5000, 10000, 25000, 50000, 100000, 200000, 500000, 1000000,
            2000000, 5000000, 10000000, 25000000, 50000000, 100000000, 200000000, 500000000, 1000000000, 2000000000,
            5000000000, 10000000000, 25000000000, 50000000000, 100000000000, 250000000000, 500000000000, 1000000000000, 2500000000000, 5000000000000,
            10000000000000, 25000000000000, 50000000000000, 100000000000000, 250000000000000, 500000000000000, 1000000000000000, 2500000000000000, 5000000000000000, 10000000000000000
        ];

        const maxBets = [
            5000, 10000, 25000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000,
            10000000, 25000000, 50000000, 100000000, 250000000, 500000000, 1000000000, 2500000000, 5000000000, 10000000000,
            25000000000, 50000000000, 100000000000, 250000000000, 500000000000, 1000000000000, 2500000000000, 5000000000000, 10000000000000, 25000000000000,
            50000000000000, 100000000000000, 250000000000000, 500000000000000, 1000000000000000, 2500000000000000, 5000000000000000, 10000000000000000, 25000000000000000, 50000000000000000
        ];

        if (this.vipLevelEl) {
            this.vipLevelEl.textContent = `VIP ${vipNames[this.vipLevel - 1]} (Level ${this.vipLevel})`;
        }

        // Update bet limit display
        const betLimit = maxBets[this.vipLevel - 1];
        if (this.betLimitEl) {
            if (this.vipLevel >= 40) {
                this.betLimitEl.textContent = 'Unlimited';
            } else {
                this.betLimitEl.textContent = betLimit.toLocaleString();
            }
        }

        // Update VIP progress
        if (this.vipProgressEl && this.vipLevel < 40) {
            const nextThreshold = vipThresholds[this.vipLevel];
            this.vipProgressEl.textContent = `Next: $${nextThreshold.toLocaleString()} balance`;
        } else if (this.vipProgressEl) {
            this.vipProgressEl.textContent = 'Maximum VIP Level Achieved!';
        }
    }

    updateVIPStatus(recalculate = true) {
        const vipNames = [
            'Bronze', 'Bronze+', 'Silver', 'Silver+', 'Gold', 'Gold+',
            'Platinum', 'Platinum+', 'Diamond', 'Diamond+', 'Ruby', 'Ruby+',
            'Emerald', 'Emerald+', 'Sapphire', 'Sapphire+', 'Elite', 'Elite+',
            'Legendary', 'Legendary+', 'Mythical', 'Mythical+', 'Celestial', 'Celestial+',
            'Divine', 'Divine+', 'Transcendent', 'Transcendent+', 'Omnipotent', 'Omnipotent+',
            'Cosmic', 'Cosmic+', 'Universal', 'Universal+', 'Infinite', 'Infinite+',
            'Eternal', 'Eternal+', 'Godlike', 'APEX'
        ];

        const vipThresholds = [
            0, 2000, 5000, 10000, 25000, 50000, 100000, 200000, 500000, 1000000,
            2000000, 5000000, 10000000, 25000000, 50000000, 100000000, 200000000, 500000000, 1000000000, 2000000000,
            5000000000, 10000000000, 25000000000, 50000000000, 100000000000, 250000000000, 500000000000, 1000000000000, 2500000000000, 5000000000000,
            10000000000000, 25000000000000, 50000000000000, 100000000000000, 250000000000000, 500000000000000, 1000000000000000, 2500000000000000, 5000000000000000, 10000000000000000
        ];

        // Calculate what VIP level the current balance should be
        let balanceBasedVipLevel = 1;
        for (let i = vipThresholds.length - 1; i >= 0; i--) {
            if (this.balance >= vipThresholds[i]) {
                balanceBasedVipLevel = i + 1;
                break;
            }
        }

        // Only recalculate VIP level if:
        // 1. Explicitly requested (recalculate = true), AND
        // 2. Either no override is active, OR the balance-based level is higher than current level
        if (recalculate && (!this.vipLevelOverride || balanceBasedVipLevel > this.vipLevel)) {
            const oldVipLevel = this.vipLevel;
            this.vipLevel = balanceBasedVipLevel;

            // Clear override if we've naturally progressed to or beyond the override level
            if (this.vipLevelOverride && balanceBasedVipLevel >= oldVipLevel) {
                this.vipLevelOverride = false;
            }

            // Show promotion message if VIP level increased
            if (this.vipLevel > oldVipLevel) {
                this.showMessage(`🎉 VIP PROMOTION! Welcome to ${vipNames[this.vipLevel - 1]} Level ${this.vipLevel}! 🎉`, 'win');
            }
        }

        if (this.vipLevelEl) {
            this.vipLevelEl.textContent = `VIP ${vipNames[this.vipLevel - 1]} (Level ${this.vipLevel})`;
        }

        // Update bet limits
        const maxBets = [
            5000, 10000, 25000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000,
            10000000, 25000000, 50000000, 100000000, 250000000, 500000000, 1000000000, 2500000000, 5000000000, 10000000000,
            25000000000, 50000000000, 100000000000, 250000000000, 500000000000, 1000000000000, 2500000000000, 5000000000000, 10000000000000, 25000000000000,
            50000000000000, 100000000000000, 250000000000000, 500000000000000, 1000000000000000, 2500000000000000, 5000000000000000, 10000000000000000, 25000000000000000
        ];

        const betLimit = maxBets[this.vipLevel - 1];
        if (this.betLimitEl) {
            if (this.vipLevel >= 40) {
                this.betLimitEl.textContent = 'Unlimited';
            } else {
                this.betLimitEl.textContent = betLimit.toLocaleString();
            }
        }

        // Update VIP progress
        if (this.vipProgressEl && this.vipLevel < 40) {
            const nextThreshold = vipThresholds[this.vipLevel];
            this.vipProgressEl.textContent = `Next: $${nextThreshold.toLocaleString()} balance`;
        } else if (this.vipProgressEl) {
            this.vipProgressEl.textContent = 'Maximum VIP Level Achieved!';
        }

        // Update theme display when VIP level changes
        this.updateThemeDisplay();
    }

    // Dealer personality system
    selectDealerPersonality() {
        const personalities = [
            {
                name: 'Marcus',
                type: 'professional',
                greetings: [
                    "Welcome to the table. Let's play some blackjack.",
                    "Good to see you. Ready for a fair game?",
                    "Take your time, make your decisions carefully."
                ]
            },
            {
                name: 'Isabella',
                type: 'charming',
                greetings: [
                    "Hello there, handsome. Feeling lucky tonight?",
                    "Welcome, darling. Let's see what fortune brings.",
                    "Oh my, another challenger. This should be fun."
                ]
            },
            {
                name: 'Viktor',
                type: 'stern',
                greetings: [
                    "Sit down. We play by the rules here.",
                    "Another player. Let's get this over with.",
                    "You know the game? Good. Let's begin."
                ]
            }
        ];

        return personalities[Math.floor(Math.random() * personalities.length)];
    }

    showDealerGreeting() {
        if (this.dealerPersonality && this.dealerPersonality.greetings) {
            const greeting = this.dealerPersonality.greetings[Math.floor(Math.random() * this.dealerPersonality.greetings.length)];
            this.showDealerComment(greeting, this.dealerPersonality.type);
        }
    }

    showDealerComment(comment, type = '') {
        if (this.dealerCommentEl && this.dealerPersonality) {
            const formattedComment = `${this.dealerPersonality.name}: ${comment}`;
            this.dealerCommentEl.textContent = formattedComment;
            this.dealerCommentEl.className = `dealer-comment show ${type}`;

            setTimeout(() => {
                this.dealerCommentEl.classList.remove('show');
            }, 3000);
        }
    }

    showDealerResultComment(results) {
        if (!this.dealerPersonality) return;

        let comment = '';
        const isWin = Array.isArray(results) ?
            results.some(r => r.winnings > this.currentBets[results.indexOf(r)]) :
            ['win', 'blackjack', 'dealer-bust'].includes(results);

        const winComments = {
            professional: [
                "Well played. Congratulations on your win.",
                "Nice hand. You played that correctly.",
                "Good strategy. You deserved that win."
            ],
            charming: [
                "Oh my! You're quite the player, aren't you?",
                "Impressive! I do love a skilled opponent.",
                "Wonderful! Your luck is simply divine tonight."
            ],
            stern: [
                "Hmph. Lucky hand.",
                "You got lucky this time.",
                "Don't let it go to your head."
            ]
        };

        const loseComments = {
            professional: [
                "Better luck next hand.",
                "The cards weren't in your favor this time.",
                "That's how the game goes sometimes."
            ],
            charming: [
                "Oh dear, that's unfortunate. But don't worry, darling.",
                "The cards can be so cruel sometimes, can't they?",
                "Don't let it discourage you, sweetie."
            ],
            stern: [
                "House wins. As expected.",
                "Should have played more carefully.",
                "That's what happens when you take risks."
            ]
        };

        const comments = isWin ? winComments[this.dealerPersonality.type] : loseComments[this.dealerPersonality.type];
        if (comments && comments.length > 0) {
            comment = comments[Math.floor(Math.random() * comments.length)];
            setTimeout(() => {
                this.showDealerComment(comment, this.dealerPersonality.type);
            }, 1500); // Show after the main game message
        }
    }

    // Loan system methods
    updateLoanStatus() {
        if (!this.loanStatusEl) return;

        if (this.loanTaken) {
            const gamesLeft = this.maxLoanGames - this.gamesWithLoan;
            this.loanStatusEl.innerHTML = `
                <div class="loan-active">
                    <div class="loan-amount">Outstanding Debt: $${this.loanAmount.toLocaleString()}</div>
                    <div class="loan-games">Games Remaining: ${gamesLeft}</div>
                    <div class="loan-note">⚠️ Both blackjack hands AND slot spins count as games!</div>
                    <div class="loan-warning">${gamesLeft <= 2 ? '🚨 URGENT: Pay now or face PERMANENT LOCKDOWN!' : gamesLeft <= 4 ? '⚠️ WARNING: Deadline approaching fast!' : ''}</div>
                </div>
            `;

            // Update repay button text with current debt amount
            if (this.repayBtn) {
                this.repayBtn.textContent = `💸 Repay Loan ($${this.loanAmount.toLocaleString()})`;
            }
        } else {
            this.loanStatusEl.textContent = 'No active loans';

            // Reset repay button text when no loan
            if (this.repayBtn) {
                this.repayBtn.textContent = '💸 Repay Loan';
            }
        }
    }

    takeLoan() {
        if (this.loanTaken) {
            this.showMessage('You already have an active loan!', 'lose');
            return;
        }

        // Initial loan: $2000 principal + 25% interest = $2500
        this.loanAmount = 2500;
        this.loanTaken = true;
        this.gamesWithLoan = 0;
        this.balance += 2000; // Player receives $2000

        this.updateBalance();
        this.updateLoanStatus();
        this.showMessage('Loan approved! $2,000 added to balance. Repay within 8 games or face consequences.', 'win');

        // Enable repay button
        if (this.repayBtn) this.repayBtn.disabled = false;
    }

    repayLoan() {
        if (!this.loanTaken) {
            this.showMessage('No active loan to repay!', 'lose');
            return;
        }

        if (this.balance < this.loanAmount) {
            this.showMessage(`Insufficient funds! Need $${this.loanAmount.toLocaleString()} to repay loan.`, 'lose');
            return;
        }

        this.balance -= this.loanAmount;
        this.loanTaken = false;
        this.loanAmount = 0;
        this.gamesWithLoan = 0;

        this.updateBalance();
        this.updateLoanStatus();
        this.showMessage('Loan repaid successfully! Your account is clear.', 'win');

        // Disable repay button
        if (this.repayBtn) this.repayBtn.disabled = true;
    }

    checkLoanProgress() {
        if (!this.loanTaken) return;

        this.gamesWithLoan++;

        // Add 25% compound interest each game - ALWAYS applies, making debt grow exponentially
        this.loanAmount = Math.floor(this.loanAmount * 1.25);

        this.updateLoanStatus();

        if (this.gamesWithLoan >= this.maxLoanGames) {
            // LOCKDOWN TIME!
            this.triggerLockdown();
        } else if (this.gamesWithLoan >= this.maxLoanGames - 2) {
            this.showMessage(`🚨 FINAL WARNING: You have 1 game left! Debt: $${this.loanAmount.toLocaleString()}. Pay NOW or face PERMANENT LOCKDOWN!`, 'lose');
        } else if (this.gamesWithLoan >= this.maxLoanGames - 2) {
            this.showMessage(`⚠️ URGENT: Only ${this.maxLoanGames - this.gamesWithLoan} games remaining! Debt: $${this.loanAmount.toLocaleString()}. Repay immediately!`, 'lose');
        } else if (this.gamesWithLoan >= this.maxLoanGames - 3) {
            this.showMessage(`⚠️ WARNING: Debt has grown to $${this.loanAmount.toLocaleString()}. ${this.maxLoanGames - this.gamesWithLoan} games left to pay!`, 'lose');
        }
    }

    triggerLockdown() {
        // Store lockdown state
        localStorage.setItem('blackjack_lockdown', 'true');
        localStorage.setItem('blackjack_debt', this.loanAmount.toString());

        // Show lockdown screen
        this.showLockdownScreen();
    }

    showLockdownScreen() {
        if (this.lockdownOverlay) {
            if (this.lockdownDebtEl) {
                this.lockdownDebtEl.textContent = `$${this.loanAmount.toLocaleString()}`;
            }
            this.lockdownOverlay.style.display = 'flex';
        }
    }

    checkLockdown() {
        const isLocked = localStorage.getItem('blackjack_lockdown');
        if (isLocked === 'true') {
            const debt = localStorage.getItem('blackjack_debt') || '2500';
            this.loanAmount = parseInt(debt);
            this.showLockdownScreen();
        }
    }

    // Tip system
    updateTipStatus() {
        if (!this.tipStatusEl) return;

        if (this.dealerTipped) {
            this.tipStatusEl.textContent = `Tipped $${this.tipAmount} - Dealer appreciates it!`;
        } else {
            this.tipStatusEl.textContent = 'No active tips';
        }
    }

    tipDealer() {
        const tipAmount = 50;

        if (this.balance < tipAmount) {
            this.showMessage('Insufficient funds to tip dealer!', 'lose');
            return;
        }

        this.balance -= tipAmount;
        this.dealerTipped = true;
        this.tipAmount = tipAmount;
        this.tipsGiven++;

        this.updateBalance();
        this.updateTipStatus();
        this.showMessage(`Tipped dealer $${tipAmount}! They might be more helpful now...`, 'win');
    }

    resetTips() {
        this.dealerTipped = false;
        this.tipAmount = 0;
        this.updateTipStatus();
    }

    // Psychological manipulation methods
    updateStreakCounter() {
        if (!this.streakCounterEl) return;

        if (this.losingStreak >= 3) {
            this.streakCounterEl.innerHTML = `
                <div class="losing-streak">
                    💀 ${this.losingStreak} losses in a row! 
                    <span class="streak-advice">Maybe try the shop for luck?</span>
                </div>
            `;
        } else if (this.winningStreak >= 3) {
            this.streakCounterEl.innerHTML = `
                <div class="winning-streak">
                    🔥 ${this.winningStreak} wins in a row! 
                    <span class="streak-advice">You're on fire!</span>
                </div>
            `;
        } else {
            this.streakCounterEl.textContent = '';
        }
    }

    updateTableTemperature() {
        if (!this.tableTemperatureEl) return;

        const temps = {
            hot: '🔥 Table: HOT',
            cold: '❄️ Table: COLD',
            neutral: '🌡️ Table: Neutral'
        };

        this.tableTemperatureEl.textContent = temps[this.tableTemperature] || temps.neutral;
    }

    startSubliminalSystem() {
        // Periodic subliminal messages
        setInterval(() => {
            if (Math.random() < 0.1 && this.balance < 1000) { // 10% chance when low on funds
                this.showSubliminalMessage();
            }
        }, 30000); // Every 30 seconds
    }

    showSubliminalMessage() {
        if (!this.subliminalFlashEl) return;

        const messages = [
            'KEEP PLAYING',
            'YOU CAN WIN',
            'ONE MORE HAND',
            'LUCK IS COMING',
            'BIG WIN SOON'
        ];

        const message = messages[Math.floor(Math.random() * messages.length)];
        this.subliminalFlashEl.textContent = message;
        this.subliminalFlashEl.style.opacity = '1';

        setTimeout(() => {
            this.subliminalFlashEl.style.opacity = '0';
        }, 100); // Flash for 100ms
    }
    // Tab system methods
    initializeTabs() {
        // Show game tab by default, hide others
        this.switchTab('game');
    }

    switchTab(tabName) {
        // Hide all tab contents with smooth transition
        const tabContents = [this.gameContent, this.shopContent, this.bankContent, this.slotsContent, this.themesContent, this.devContent, this.rouletteContent];
        const tabButtons = [this.gameTabBtn, this.shopTabBtn, this.bankTabBtn, this.slotsTabBtn, this.themesTabBtn, this.devTabBtn, this.rouletteTabBtn];

        // First fade out current tab
        tabContents.forEach(content => {
            if (content && content.classList.contains('active')) {
                content.style.opacity = '0';
                content.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    content.classList.remove('active');
                }, 200);
            }
        });

        tabButtons.forEach(button => {
            if (button) button.classList.remove('active');
        });

        // Then fade in new tab after a delay
        setTimeout(() => {
            switch (tabName) {
                case 'game':
                    if (this.gameContent) {
                        this.gameContent.classList.add('active');
                        setTimeout(() => {
                            this.gameContent.style.opacity = '1';
                            this.gameContent.style.transform = 'translateY(0)';
                        }, 50);
                    }
                    if (this.gameTabBtn) this.gameTabBtn.classList.add('active');
                    break;
                case 'shop':
                    if (this.shopContent) {
                        this.shopContent.classList.add('active');
                        setTimeout(() => {
                            this.shopContent.style.opacity = '1';
                            this.shopContent.style.transform = 'translateY(0)';
                        }, 50);
                    }
                    if (this.shopTabBtn) this.shopTabBtn.classList.add('active');
                    break;
                case 'bank':
                    if (this.bankContent) {
                        this.bankContent.classList.add('active');
                        setTimeout(() => {
                            this.bankContent.style.opacity = '1';
                            this.bankContent.style.transform = 'translateY(0)';
                        }, 50);
                    }
                    if (this.bankTabBtn) this.bankTabBtn.classList.add('active');
                    break;
                case 'slots':
                    if (this.slotsContent) {
                        this.slotsContent.classList.add('active');
                        setTimeout(() => {
                            this.slotsContent.style.opacity = '1';
                            this.slotsContent.style.transform = 'translateY(0)';
                        }, 50);
                    }
                    if (this.slotsTabBtn) this.slotsTabBtn.classList.add('active');
                    break;
                case 'roulette':
                    if (this.rouletteContent) {
                        this.rouletteContent.classList.add('active');
                        setTimeout(() => {
                            this.rouletteContent.style.opacity = '1';
                            this.rouletteContent.style.transform = 'translateY(0)';
                        }, 50);
                    }
                    if (this.rouletteTabBtn) this.rouletteTabBtn.classList.add('active');
                    break;
                case 'themes':
                    if (this.themesContent) {
                        this.themesContent.classList.add('active');
                        setTimeout(() => {
                            this.themesContent.style.opacity = '1';
                            this.themesContent.style.transform = 'translateY(0)';
                        }, 50);
                    }
                    if (this.themesTabBtn) this.themesTabBtn.classList.add('active');
                    break;
                case 'dev':
                    if (this.devContent) {
                        this.devContent.classList.add('active');
                        setTimeout(() => {
                            this.devContent.style.opacity = '1';
                            this.devContent.style.transform = 'translateY(0)';
                        }, 50);
                    }
                    if (this.devTabBtn) this.devTabBtn.classList.add('active');
                    break;
            }
        }, 200);
    }

    // Shop system methods
    buyShopItem(item, price) {
        if (this.balance < price) {
            this.showMessage(`Insufficient funds! Need $${price} for ${item}.`, 'lose');
            return;
        }

        this.balance -= price;
        this.inventory[item] = (this.inventory[item] || 0) + 1;

        this.updateBalance();
        this.updateInventoryDisplay();
        this.showMessage(`✨ Purchased ${item.replace('-', ' ')} for $${price}! ✨`, 'win');
    }

    updateInventoryDisplay() {
        if (!this.inventoryList) return;

        const itemNames = {
            'rabbit-foot': '🐰 Rabbit\'s Foot',
            'clover': '🍀 Four-Leaf Clover',
            'evil-eye': '🧿 Evil Eye Protection',
            'fortune': '🔮 Fortune Reading',
            'blessing': '🎴 Card Blessing',
            'hotstreak': '⚡ Hot Streak Activator',
            'breaker': '🎯 Streak Breaker'
        };

        let hasItems = false;
        let inventoryHTML = '';

        for (const [item, count] of Object.entries(this.inventory)) {
            if (count > 0) {
                hasItems = true;
                inventoryHTML += `
                    <div class="inventory-item">
                        <span class="item-name">${itemNames[item] || item}</span>
                        <span class="item-count">×${count}</span>
                    </div>
                `;
            }
        }

        if (hasItems) {
            this.inventoryList.innerHTML = inventoryHTML;
        } else {
            this.inventoryList.innerHTML = '<div class="inventory-empty">No items purchased yet</div>';
        }
    }

    // Slots system methods
    setupSlotsListeners() {
        const spinBtn = document.getElementById('spin-btn');
        const maxBetBtn = document.getElementById('max-bet-btn');
        const betSelect = document.getElementById('slot-bet');
        const customBetContainer = document.getElementById('custom-bet-container');
        const customBetInput = document.getElementById('custom-bet-input');
        const applyCustomBetBtn = document.getElementById('apply-custom-bet');

        if (spinBtn) {
            spinBtn.addEventListener('click', () => this.spinSlots());
        }

        if (maxBetBtn) {
            maxBetBtn.addEventListener('click', () => this.maxBetSlots());
        }

        // Handle custom bet selection
        if (betSelect) {
            betSelect.addEventListener('change', (e) => {
                if (e.target.value === 'custom') {
                    customBetContainer.style.display = 'flex';
                    customBetInput.focus();
                } else {
                    customBetContainer.style.display = 'none';
                }
            });
        }

        // Handle custom bet input
        if (applyCustomBetBtn && customBetInput) {
            applyCustomBetBtn.addEventListener('click', () => {
                this.applyCustomBet();
            });

            customBetInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.applyCustomBet();
                }
            });

            // Format input as user types
            customBetInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/[^0-9]/g, '');
                if (value) {
                    e.target.value = value;
                }
            });
        }
    }

    applyCustomBet() {
        const customBetInput = document.getElementById('custom-bet-input');
        const betSelect = document.getElementById('slot-bet');
        const customBetContainer = document.getElementById('custom-bet-container');
        const applyBtn = document.getElementById('apply-custom-bet');

        if (!customBetInput || !betSelect) return;

        const customAmount = parseInt(customBetInput.value);

        // Validation
        if (!customAmount || customAmount < 10) {
            this.showMessage('Minimum bet is $10!', 'lose');
            customBetInput.focus();
            return;
        }

        if (customAmount > this.balance) {
            this.showMessage('Insufficient funds!', 'lose');
            customBetInput.focus();
            return;
        }

        // Add loading animation
        applyBtn.classList.add('loading');
        applyBtn.textContent = 'Applying...';
        applyBtn.disabled = true;

        setTimeout(() => {
            // Create or update custom option
            let customOption = betSelect.querySelector('option[value="' + customAmount + '"]');
            if (!customOption) {
                customOption = document.createElement('option');
                customOption.value = customAmount;
                customOption.textContent = `$${customAmount.toLocaleString()}`;

                // Insert in correct position (before "Custom Amount" option)
                const customAmountOption = betSelect.querySelector('option[value="custom"]');
                betSelect.insertBefore(customOption, customAmountOption);
            }

            // Select the custom amount
            betSelect.value = customAmount;

            // Hide custom input
            customBetContainer.style.display = 'none';
            customBetInput.value = '';

            // Remove loading animation
            applyBtn.classList.remove('loading');
            applyBtn.textContent = 'Apply';
            applyBtn.disabled = false;

            // Show success message
            this.showMessage(`✨ Custom bet set to $${customAmount.toLocaleString()}! ✨`, 'win');
        }, 500);
    }

    spinSlots() {
        const betSelect = document.getElementById('slot-bet');
        let betAmount = parseInt(betSelect.value);

        // Handle custom bet selection
        if (betSelect.value === 'custom') {
            this.showMessage('Please set a custom bet amount first!', 'lose');
            return;
        }

        if (isNaN(betAmount) || betAmount < 10) {
            this.showMessage('Invalid bet amount!', 'lose');
            return;
        }

        if (betAmount > this.balance) {
            this.showMessage('Insufficient funds for slots!', 'lose');
            return;
        }

        this.balance -= betAmount;
        this.totalSpins++;
        this.updateBalance();

        // CRITICAL: Slot spins count as "games" for loan purposes - each spin advances loan deadline!
        this.checkLoanProgress();

        // Disable the spin button during animation
        const spinBtn = document.getElementById('spin-btn');
        if (spinBtn) {
            spinBtn.disabled = true;
            spinBtn.textContent = 'SPINNING...';
        }

        // Animate reels
        this.animateSlotReels();

        // Determine result after animation completes
        setTimeout(() => {
            // CRITICAL: Force stop all animations immediately
            if (this.spinIntervals) {
                this.spinIntervals.forEach(interval => clearInterval(interval));
                this.spinIntervals = [];
            }

            // Remove all spinning classes immediately
            const reels = ['reel1', 'reel2', 'reel3'];
            reels.forEach(reelId => {
                const reel = document.getElementById(reelId);
                if (reel) {
                    reel.classList.remove('spinning', 'reel-stopping');
                }
            });

            // Remove machine spinning effect
            const slotMachine = document.querySelector('.slot-machine-frame');
            if (slotMachine) {
                slotMachine.classList.remove('machine-spinning');
            }

            // NEW APPROACH: Read whatever symbols are currently displayed and calculate payout from those
            this.calculatePayoutFromDisplayedSymbols(betAmount);

            // Re-enable spin button
            if (spinBtn) {
                spinBtn.disabled = false;
                spinBtn.textContent = '🎰 SPIN 🎰';
            }
        }, 2400); // Wait for visual effect, then calculate from displayed symbols
    }

    animateSlotReels() {
        const reels = ['reel1', 'reel2', 'reel3'];

        // Store intervals so we can clear them before showing results
        this.spinIntervals = [];

        // Determine what the final result should be based on odds
        const finalResult = this.determineSlotOutcome();

        // Add spinning sound effect (visual feedback)
        const slotMachine = document.querySelector('.slot-machine-frame');
        if (slotMachine) {
            slotMachine.classList.add('machine-spinning');
        }

        reels.forEach((reelId, index) => {
            const reel = document.getElementById(reelId);
            if (reel) {
                reel.classList.add('spinning');

                // Change symbols rapidly during spin for all three positions
                const spinInterval = setInterval(() => {
                    const aboveSymbol = this.slotSymbols[Math.floor(Math.random() * this.slotSymbols.length)];
                    const centerSymbol = this.slotSymbols[Math.floor(Math.random() * this.slotSymbols.length)];
                    const belowSymbol = this.slotSymbols[Math.floor(Math.random() * this.slotSymbols.length)];

                    const aboveEl = reel.querySelector('.slot-symbol.above');
                    const centerEl = reel.querySelector('.slot-symbol.center');
                    const belowEl = reel.querySelector('.slot-symbol.below');

                    if (aboveEl) aboveEl.textContent = aboveSymbol;
                    if (centerEl) centerEl.textContent = centerSymbol;
                    if (belowEl) belowEl.textContent = belowSymbol;
                }, 100);

                // Store interval reference
                this.spinIntervals.push(spinInterval);

                // Stop spinning after 2 seconds (staggered for each reel)
                setTimeout(() => {
                    clearInterval(spinInterval);
                    reel.classList.remove('spinning');

                    // Set the final symbol based on predetermined outcome
                    const centerEl = reel.querySelector('.slot-symbol.center');
                    if (centerEl) {
                        centerEl.textContent = finalResult.symbols[index];
                    }

                    // Randomize above and below symbols for visual variety
                    const aboveEl = reel.querySelector('.slot-symbol.above');
                    const belowEl = reel.querySelector('.slot-symbol.below');
                    if (aboveEl) aboveEl.textContent = this.slotSymbols[Math.floor(Math.random() * this.slotSymbols.length)];
                    if (belowEl) belowEl.textContent = this.slotSymbols[Math.floor(Math.random() * this.slotSymbols.length)];

                    // Add stopping effect
                    reel.classList.add('reel-stopping');
                    setTimeout(() => {
                        reel.classList.remove('reel-stopping');
                    }, 300);

                    // Remove machine spinning effect when last reel stops
                    if (index === reels.length - 1 && slotMachine) {
                        setTimeout(() => {
                            slotMachine.classList.remove('machine-spinning');
                        }, 300);
                    }
                }, 2000 + (index * 200)); // Stagger reel stops
            }
        });
    }

    calculatePayoutFromDisplayedSymbols(betAmount) {
        // Read the actual symbols currently displayed in the center of each reel
        const reel1Center = document.querySelector('#reel1 .slot-symbol.center');
        const reel2Center = document.querySelector('#reel2 .slot-symbol.center');
        const reel3Center = document.querySelector('#reel3 .slot-symbol.center');

        if (!reel1Center || !reel2Center || !reel3Center) {
            console.error('Could not find reel center elements');
            return;
        }

        const displayedSymbols = [
            reel1Center.textContent,
            reel2Center.textContent,
            reel3Center.textContent
        ];

        console.log(`🎰 Calculating payout from displayed symbols: ${displayedSymbols.join(' ')}`);

        // Calculate winnings based on displayed symbols - only three of a kind wins
        let winnings = 0;
        let multiplier = 0;
        let isWin = false;

        const symbol1 = displayedSymbols[0];
        const symbol2 = displayedSymbols[1];
        const symbol3 = displayedSymbols[2];

        // Only proceed if ALL THREE symbols are identical
        if (symbol1 === symbol2 && symbol2 === symbol3 && symbol1 === symbol3) {
            const winningSymbol = symbol1;

            // Only pay out for symbols that are actually in the paytable
            switch (winningSymbol) {
                case '💎':
                    winnings = betAmount * 1000;
                    multiplier = 1000;
                    isWin = true;
                    break;
                case '7️⃣':
                    winnings = betAmount * 500;
                    multiplier = 500;
                    isWin = true;
                    break;
                case '🔔':
                    winnings = betAmount * 100;
                    multiplier = 100;
                    isWin = true;
                    break;
                case '⭐':
                    winnings = betAmount * 50;
                    multiplier = 50;
                    isWin = true;
                    break;
                case '🍒':
                    winnings = betAmount * 25;
                    multiplier = 25;
                    isWin = true;
                    break;
                case '🍊':
                    winnings = betAmount * 6;
                    multiplier = 6;
                    isWin = true;
                    break;
                default:
                    // No payout for symbols not in paytable
                    winnings = 0;
                    multiplier = 0;
                    isWin = false;
                    break;
            }

            // Highlight winning symbols if it's actually a win
            if (isWin) {
                this.highlightWinningSymbols();
            }
        } else {
            // Mixed symbols or two-of-a-kind - no payout
            winnings = 0;
            multiplier = 0;
            isWin = false;
        }

        // Update balance and display
        if (winnings > 0) {
            this.balance += winnings;
            this.lastSlotWin = winnings;

            if (multiplier === 1000) {
                this.showMessage(`🎰💎 JACKPOT! $${winnings.toLocaleString()}! 💎🎰`, 'win');
                // Special jackpot celebration
                this.celebrateJackpot();
            } else {
                this.showMessage(`🎰 WIN! ${displayedSymbols[0]} ${displayedSymbols[1]} ${displayedSymbols[2]} = $${winnings.toLocaleString()} (${multiplier}x) 🎰`, 'win');
            }
        } else {
            this.lastSlotWin = 0;
            // Show losing message
            this.showMessage(`${displayedSymbols[0]} ${displayedSymbols[1]} ${displayedSymbols[2]} - Try again!`, 'lose');
        }

        this.updateBalance();
        this.updateSlotDisplay();
    }

    determineSlotOutcome() {
        // Use adjustable odds from dev tab to determine what symbols should be displayed
        const random = Math.random();
        let symbols = [];

        const jackpotChance = this.slotOdds.jackpot;
        const bigWinChance = this.slotOdds.bigWin;
        const mediumWinChance = this.slotOdds.mediumWin;
        const smallWinChance = this.slotOdds.smallWin;

        // RARE Jackpot chance
        if (random < jackpotChance) {
            symbols = ['💎', '💎', '💎']; // JACKPOT!
        }
        // Big win chance (777, bells, stars)
        else if (random < jackpotChance + bigWinChance) {
            const bigWinSymbols = ['7️⃣', '🔔', '⭐'];
            const winSymbol = bigWinSymbols[Math.floor(Math.random() * bigWinSymbols.length)];
            symbols = [winSymbol, winSymbol, winSymbol];
        }
        // Medium win chance (oranges only)
        else if (random < jackpotChance + bigWinChance + mediumWinChance) {
            symbols = ['🍊', '🍊', '🍊'];
        }
        // Small win chance (cherries)
        else if (random < jackpotChance + bigWinChance + mediumWinChance + smallWinChance) {
            symbols = ['🍒', '🍒', '🍒'];
        }
        // Loss (remaining percentage) - generate random symbols but ensure NO winning combinations
        else {
            // Generate completely random symbols
            symbols = [
                this.slotSymbols[Math.floor(Math.random() * this.slotSymbols.length)],
                this.slotSymbols[Math.floor(Math.random() * this.slotSymbols.length)],
                this.slotSymbols[Math.floor(Math.random() * this.slotSymbols.length)]
            ];

            // CRITICAL: Ensure it's not a winning combination (no three of a kind)
            // Keep regenerating until we have a guaranteed losing combination
            let attempts = 0;
            while (symbols[0] === symbols[1] && symbols[1] === symbols[2] && attempts < 10) {
                symbols[2] = this.slotSymbols[Math.floor(Math.random() * this.slotSymbols.length)];
                attempts++;
            }

            // Extra safety: if we somehow still have three of a kind, force a losing combination
            if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
                symbols = ['🍒', '🍊', '🔔']; // Guaranteed non-matching combination
            }
        }

        return { symbols };
    }

    // Legacy function - now simplified since we calculate from displayed symbols
    determineSlotResult(betAmount) {
        // This function now just returns the bet amount for reference
        // The actual result calculation happens in calculatePayoutFromDisplayedSymbols
        return { betAmount };
    }

    showSlotResult(result, betAmount) {
        const { symbols } = result;

        // Update reel displays - update center symbols with winning combination
        // and randomize above/below symbols for visual variety
        const reels = ['reel1', 'reel2', 'reel3'];

        reels.forEach((reelId, index) => {
            const reel = document.getElementById(reelId);
            if (reel) {
                const aboveEl = reel.querySelector('.slot-symbol.above');
                const centerEl = reel.querySelector('.slot-symbol.center');
                const belowEl = reel.querySelector('.slot-symbol.below');

                // Set center symbol to result
                if (centerEl) centerEl.textContent = symbols[index];

                // Randomize above and below symbols for visual variety
                if (aboveEl) aboveEl.textContent = this.slotSymbols[Math.floor(Math.random() * this.slotSymbols.length)];
                if (belowEl) belowEl.textContent = this.slotSymbols[Math.floor(Math.random() * this.slotSymbols.length)];
            }
        });

        // Calculate winnings based on corrected paytable - only three of a kind wins
        let winnings = 0;
        let multiplier = 0;
        let isWin = false;

        // STRICT validation: Check for three of a kind only - NO two-of-a-kind payouts
        const symbol1 = symbols[0];
        const symbol2 = symbols[1];
        const symbol3 = symbols[2];

        // Only proceed if ALL THREE symbols are identical
        if (symbol1 === symbol2 && symbol2 === symbol3 && symbol1 === symbol3) {
            const winningSymbol = symbol1;

            // Only pay out for symbols that are actually in the paytable
            switch (winningSymbol) {
                case '💎':
                    winnings = betAmount * 1000;
                    multiplier = 1000;
                    isWin = true;
                    break;
                case '7️⃣':
                    winnings = betAmount * 500;
                    multiplier = 500;
                    isWin = true;
                    break;
                case '🔔':
                    winnings = betAmount * 100;
                    multiplier = 100;
                    isWin = true;
                    break;
                case '⭐':
                    winnings = betAmount * 50;
                    multiplier = 50;
                    isWin = true;
                    break;
                case '🍒':
                    winnings = betAmount * 25;
                    multiplier = 25;
                    isWin = true;
                    break;
                case '🍊':
                    winnings = betAmount * 6;
                    multiplier = 6;
                    isWin = true;
                    break;
                default:
                    // No payout for symbols not in paytable (including 🍋)
                    winnings = 0;
                    multiplier = 0;
                    isWin = false;
                    break;
            }

            // Only highlight winning symbols if it's actually a win
            if (isWin) {
                this.highlightWinningSymbols();
            }
        } else {
            // Mixed symbols or two-of-a-kind - no payout
            winnings = 0;
            multiplier = 0;
            isWin = false;
        }
        // IMPORTANT: No two of a kind payouts - you either get three of a kind or nothing
        // This ensures only 3 matching symbols in a row result in a win

        // Update slot display
        this.updateSlotDisplay();

        if (winnings > 0) {
            this.balance += winnings;
            this.lastSlotWin = winnings;

            if (multiplier === 1000) {
                this.showMessage(`🎰💎 JACKPOT! $${winnings.toLocaleString()}! 💎🎰`, 'win');
                // Special jackpot celebration
                this.celebrateJackpot();
            } else {
                this.showMessage(`🎰 WIN! ${symbols[0]} ${symbols[1]} ${symbols[2]} = $${winnings.toLocaleString()} (${multiplier}x) 🎰`, 'win');
            }
        } else {
            this.lastSlotWin = 0;
            // Show losing message - this includes two-of-a-kind which do NOT win
            this.showMessage(`${symbols[0]} ${symbols[1]} ${symbols[2]} - Try again!`, 'lose');
        }

        this.updateBalance();
        this.updateSlotDisplay();
    }

    celebrateJackpot() {
        // Add special jackpot celebration effects
        const celebration = document.createElement('div');
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4em;
            color: #ffd700;
            text-shadow: 0 0 30px #ffd700, 0 0 60px #ff4444, 0 0 90px #ffd700;
            z-index: 10000;
            pointer-events: none;
            animation: jackpotCelebration 4s ease-out forwards;
            font-weight: bold;
            text-align: center;
            white-space: nowrap;
        `;
        celebration.textContent = '💎 MEGA JACKPOT! 💎';
        document.body.appendChild(celebration);

        // Add confetti effect
        this.createSlotConfetti();

        // Flash the slot machine
        const slotMachine = document.querySelector('.slot-machine-frame');
        if (slotMachine) {
            slotMachine.style.animation = 'jackpotFlash 0.5s ease-in-out 6';
        }

        // Add celebration styles
        const celebrationStyles = document.createElement('style');
        celebrationStyles.textContent = `
            @keyframes jackpotCelebration {
                0% { 
                    transform: translate(-50%, -50%) scale(0.5); 
                    opacity: 0; 
                }
                20% { 
                    transform: translate(-50%, -50%) scale(1.2); 
                    opacity: 1; 
                }
                40% { 
                    transform: translate(-50%, -50%) scale(0.9); 
                }
                60% { 
                    transform: translate(-50%, -50%) scale(1.1); 
                }
                80% { 
                    transform: translate(-50%, -50%) scale(1); 
                }
                100% { 
                    transform: translate(-50%, -50%) scale(1); 
                    opacity: 0; 
                }
            }
            
            @keyframes jackpotFlash {
                0%, 100% { 
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
                }
                50% { 
                    box-shadow: 0 10px 30px rgba(255, 215, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.6);
                    border-color: #ffd700;
                }
            }
        `;
        document.head.appendChild(celebrationStyles);

        setTimeout(() => {
            if (celebration.parentNode) {
                celebration.parentNode.removeChild(celebration);
            }
            if (celebrationStyles.parentNode) {
                celebrationStyles.parentNode.removeChild(celebrationStyles);
            }
            if (slotMachine) {
                slotMachine.style.animation = '';
            }
        }, 4000);
    }

    highlightWinningSymbols() {
        // Add winning effect to center symbols
        const reels = ['reel1', 'reel2', 'reel3'];
        reels.forEach(reelId => {
            const reel = document.getElementById(reelId);
            if (reel) {
                const centerEl = reel.querySelector('.slot-symbol.center');
                if (centerEl) {
                    centerEl.classList.add('winning');

                    // Remove winning effect after 3 seconds
                    setTimeout(() => {
                        centerEl.classList.remove('winning');
                    }, 3000);
                }
            }
        });
    }

    createSlotConfetti() {
        // Create confetti particles
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            const symbols = ['💎', '🎰', '💰', '⭐', '🔔', '7️⃣'];
            confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            confetti.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * 100}vw;
                font-size: ${Math.random() * 30 + 20}px;
                z-index: 9999;
                pointer-events: none;
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            `;

            const confettiStyle = document.createElement('style');
            confettiStyle.textContent = `
                @keyframes confettiFall {
                    0% { 
                        transform: translateY(-50px) rotate(0deg); 
                        opacity: 1; 
                    }
                    100% { 
                        transform: translateY(100vh) rotate(360deg); 
                        opacity: 0; 
                    }
                }
            `;

            document.head.appendChild(confettiStyle);
            document.body.appendChild(confetti);

            setTimeout(() => {
                if (confetti.parentNode) confetti.parentNode.removeChild(confetti);
                if (confettiStyle.parentNode) confettiStyle.parentNode.removeChild(confettiStyle);
            }, 5000);
        }
    }

    updateSlotDisplay() {
        // Update last win display
        const lastWinEl = document.getElementById('last-win-amount');
        if (lastWinEl) {
            lastWinEl.textContent = this.lastSlotWin.toLocaleString();
        }

        // Update total spins
        const totalSpinsEl = document.getElementById('total-spins');
        if (totalSpinsEl) {
            totalSpinsEl.textContent = this.totalSpins.toString();
        }

        // Update win display
        const winDisplayEl = document.getElementById('slot-win-display');
        if (winDisplayEl) {
            winDisplayEl.textContent = `$${this.lastSlotWin.toLocaleString()}`;
        }
    }

    maxBetSlots() {
        const betSelect = document.getElementById('slot-bet');
        if (!betSelect) return;

        // Get all available bet options
        const options = Array.from(betSelect.options).map(option => parseInt(option.value));

        // Find the highest bet the player can afford and is allowed to make
        let maxAffordable = Math.min(this.balance, 1000000); // Cap at $1M

        // Find the highest option that's <= maxAffordable
        let bestOption = options[0]; // Default to minimum
        for (let option of options) {
            if (option <= maxAffordable) {
                bestOption = option;
            } else {
                break;
            }
        }

        betSelect.value = bestOption.toString();
        this.spinSlots();
    }

    // Roulette system methods
    setupRouletteListeners() {
        // Initialize roulette system
        this.rouletteBets = [];
        this.rouletteHistory = [];
        this.rouletteNumbers = {
            red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
            black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
            green: [0]
        };

        // European roulette wheel layout (proper order)
        this.wheelLayout = [
            0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10,
            5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
        ];

        // Create the wheel numbers
        this.createRouletteWheel();

        // Roulette bet amount handling
        const rouletteBetSelect = document.getElementById('roulette-bet');
        const rouletteCustomBetInput = document.getElementById('roulette-custom-bet');

        if (rouletteBetSelect) {
            rouletteBetSelect.addEventListener('change', () => {
                if (rouletteBetSelect.value === 'custom') {
                    rouletteCustomBetInput.style.display = 'block';
                    rouletteCustomBetInput.focus();
                } else {
                    rouletteCustomBetInput.style.display = 'none';
                }
            });
        }

        if (rouletteCustomBetInput) {
            rouletteCustomBetInput.addEventListener('input', () => {
                const customAmount = parseInt(rouletteCustomBetInput.value);
                if (customAmount >= 10) {
                    rouletteBetSelect.value = customAmount.toString();
                    if (!Array.from(rouletteBetSelect.options).some(option => option.value === customAmount.toString())) {
                        const newOption = document.createElement('option');
                        newOption.value = customAmount.toString();
                        newOption.textContent = `$${customAmount.toLocaleString()}`;
                        newOption.selected = true;
                        rouletteBetSelect.insertBefore(newOption, rouletteBetSelect.lastElementChild);
                    }
                }
            });
        }

        // Spin button
        const spinRouletteBtn = document.getElementById('spin-roulette-btn');
        if (spinRouletteBtn) {
            spinRouletteBtn.addEventListener('click', () => this.spinRoulette());
        }

        // Clear bets button
        const clearBetsBtn = document.getElementById('clear-bets-btn');
        if (clearBetsBtn) {
            clearBetsBtn.addEventListener('click', () => this.clearRouletteBets());
        }

        // Number betting
        document.querySelectorAll('.number-bet').forEach(numberEl => {
            numberEl.addEventListener('click', () => {
                const number = parseInt(numberEl.dataset.number);
                this.placeRouletteBet('number', number);
            });
        });

        // Outside betting
        document.querySelectorAll('.bet-option').forEach(betEl => {
            betEl.addEventListener('click', () => {
                const betType = betEl.dataset.bet;
                this.placeRouletteBet(betType);
            });
        });
    }

    createRouletteWheel() {
        console.log('Creating roulette wheel...');
        const wheelNumbers = document.getElementById('wheel-numbers');
        if (!wheelNumbers) {
            console.log('wheel-numbers element not found!');
            return;
        }

        console.log('Found wheel-numbers element, creating numbers...');

        // Clear existing numbers
        wheelNumbers.innerHTML = '';

        // Add center
        const center = document.createElement('div');
        center.className = 'wheel-center';
        wheelNumbers.appendChild(center);

        // Store number positions for ball animation
        this.numberPositions = {};

        // Create number elements around the wheel
        this.wheelLayout.forEach((number, index) => {
            const numberEl = document.createElement('div');
            numberEl.className = 'wheel-number';
            numberEl.textContent = number;
            numberEl.dataset.number = number;

            // Determine color
            if (number === 0) {
                numberEl.classList.add('green');
            } else if (this.rouletteNumbers.red.includes(number)) {
                numberEl.classList.add('red');
            } else {
                numberEl.classList.add('black');
            }

            // Position around the wheel
            const angle = (index * 360) / this.wheelLayout.length;
            const radius = 120; // Distance from center
            const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
            const y = Math.sin((angle - 90) * Math.PI / 180) * radius;

            numberEl.style.left = `calc(50% + ${x}px - 16px)`;
            numberEl.style.top = `calc(50% + ${y}px - 16px)`;

            // Store position for ball animation
            this.numberPositions[number] = { x, y, angle, element: numberEl };

            wheelNumbers.appendChild(numberEl);
        });

        console.log(`Created ${this.wheelLayout.length} numbers on the wheel`);
    }

    placeRouletteBet(betType, number = null) {
        const betSelect = document.getElementById('roulette-bet');
        let betAmount = parseInt(betSelect.value);

        if (betSelect.value === 'custom') {
            const customInput = document.getElementById('roulette-custom-bet');
            betAmount = parseInt(customInput.value);
        }

        if (isNaN(betAmount) || betAmount < 10) {
            this.showMessage('Invalid bet amount!', 'lose');
            return;
        }

        if (betAmount > this.balance) {
            this.showMessage('Insufficient funds!', 'lose');
            return;
        }

        // Create bet object
        const bet = {
            type: betType,
            number: number,
            amount: betAmount,
            id: Date.now()
        };

        this.rouletteBets.push(bet);
        this.balance -= betAmount;
        this.updateBalance();
        this.updateRouletteBetsDisplay();
        this.showMessage(`Bet placed: ${this.getBetDescription(bet)}`, 'win');
    }

    getBetDescription(bet) {
        switch (bet.type) {
            case 'number':
                return `$${bet.amount} on ${bet.number}`;
            case 'red':
                return `$${bet.amount} on Red`;
            case 'black':
                return `$${bet.amount} on Black`;
            case 'odd':
                return `$${bet.amount} on Odd`;
            case 'even':
                return `$${bet.amount} on Even`;
            case 'low':
                return `$${bet.amount} on 1-18`;
            case 'high':
                return `$${bet.amount} on 19-36`;
            case 'dozen1':
                return `$${bet.amount} on 1st 12`;
            case 'dozen2':
                return `$${bet.amount} on 2nd 12`;
            case 'dozen3':
                return `$${bet.amount} on 3rd 12`;
            default:
                return `$${bet.amount} bet`;
        }
    }

    updateRouletteBetsDisplay() {
        const betsList = document.getElementById('current-bets-list');
        const totalBetEl = document.getElementById('total-bet-amount');

        if (!betsList || !totalBetEl) return;

        if (this.rouletteBets.length === 0) {
            betsList.innerHTML = '<div class="no-bets">No bets placed</div>';
            totalBetEl.textContent = '0';
            return;
        }

        const totalBet = this.rouletteBets.reduce((sum, bet) => sum + bet.amount, 0);
        totalBetEl.textContent = totalBet.toLocaleString();

        betsList.innerHTML = this.rouletteBets.map(bet => `
        <div class="bet-item">
            <span>${this.getBetDescription(bet)}</span>
            <button onclick="game.removeRouletteBet(${bet.id})" style="background: #ff4757; color: white; border: none; border-radius: 3px; padding: 2px 6px; cursor: pointer;">×</button>
        </div>
    `).join('');
    }

    removeRouletteBet(betId) {
        const betIndex = this.rouletteBets.findIndex(bet => bet.id === betId);
        if (betIndex !== -1) {
            const bet = this.rouletteBets[betIndex];
            this.balance += bet.amount;
            this.rouletteBets.splice(betIndex, 1);
            this.updateBalance();
            this.updateRouletteBetsDisplay();
            this.showMessage(`Bet removed: ${this.getBetDescription(bet)}`, 'push');
        }
    }

    clearRouletteBets() {
        const totalRefund = this.rouletteBets.reduce((sum, bet) => sum + bet.amount, 0);
        this.balance += totalRefund;
        this.rouletteBets = [];
        this.updateBalance();
        this.updateRouletteBetsDisplay();
        if (totalRefund > 0) {
            this.showMessage(`All bets cleared. Refunded $${totalRefund.toLocaleString()}`, 'push');
        }
    }

    spinRoulette() {
        if (this.rouletteBets.length === 0) {
            this.showMessage('Place at least one bet to spin!', 'lose');
            return;
        }

        const spinBtn = document.getElementById('spin-roulette-btn');
        if (spinBtn) {
            spinBtn.disabled = true;
            spinBtn.textContent = 'SPINNING...';
        }

        // Start the wheel animation - let physics determine the winner
        this.animateRouletteWheel();

        // Re-enable button after animation
        setTimeout(() => {
            if (spinBtn) {
                spinBtn.disabled = false;
                spinBtn.textContent = '🎯 SPIN WHEEL 🎯';
            }
        }, 4500);
    }

    animateRouletteWheel() {
        const wheel = document.getElementById('roulette-wheel');
        const arrow = document.getElementById('roulette-arrow');

        if (!wheel || !arrow) return;

        // Remove any existing animation classes
        wheel.classList.remove('spinning');

        // Calculate smooth animation parameters
        const spinDuration = 4000; // 4 seconds
        const minSpins = 3; // Minimum number of full rotations
        const maxSpins = 6; // Maximum number of full rotations

        // Random number of spins for natural feel
        const numberOfSpins = minSpins + Math.random() * (maxSpins - minSpins);

        // Add some randomness to final position (like real physics)
        const randomOffset = Math.random() * 360;
        const totalRotation = (numberOfSpins * 360) + randomOffset;

        // Start the smooth animation
        let startTime = null;
        let startRotation = 0;

        // Get current rotation if wheel was already rotated
        const currentTransform = wheel.style.transform;
        if (currentTransform && currentTransform.includes('rotate')) {
            const match = currentTransform.match(/rotate\(([^)]+)deg\)/);
            if (match) {
                startRotation = parseFloat(match[1]) % 360;
            }
        }

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / spinDuration, 1);

            // Use easing function for natural deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentRotation = startRotation + (totalRotation * easeOut);

            // Apply rotation to wheel
            wheel.style.transform = `rotate(${currentRotation}deg)`;

            // Counter-rotate numbers to keep them upright
            const numberElements = document.querySelectorAll('.wheel-number');
            numberElements.forEach(numberEl => {
                numberEl.style.transform = `rotate(${-currentRotation}deg)`;
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete - detect winning number
                this.detectWinningNumber(currentRotation);
            }
        };

        requestAnimationFrame(animate);
    }

    detectWinningNumber(finalRotation) {
        // Normalize rotation to 0-360 range
        const normalizedRotation = ((finalRotation % 360) + 360) % 360;

        // The arrow points to the top (0 degrees), so we need to find which number is at that position
        // Since numbers are positioned starting from top and going clockwise
        const anglePerNumber = 360 / this.wheelLayout.length;

        // Find which number index is at the top (accounting for rotation)
        const topIndex = Math.round(normalizedRotation / anglePerNumber) % this.wheelLayout.length;
        const actualWinningNumber = this.wheelLayout[topIndex];

        console.log(`Wheel stopped at ${normalizedRotation}°, winning number: ${actualWinningNumber}`);

        // Highlight the winning number
        setTimeout(() => {
            const winningNumberEl = document.querySelector(`[data-number="${actualWinningNumber}"]`);
            if (winningNumberEl) {
                winningNumberEl.style.boxShadow = '0 0 20px #ffd700';
                winningNumberEl.style.transform = `rotate(${-normalizedRotation}deg) scale(1.2)`;

                // Show winning message
                const color = actualWinningNumber === 0 ? 'green' :
                    this.rouletteNumbers.red.includes(actualWinningNumber) ? 'red' : 'black';

                this.showRouletteResult(actualWinningNumber, color);

                // Remove highlight after 2 seconds
                setTimeout(() => {
                    if (winningNumberEl) {
                        winningNumberEl.style.boxShadow = '';
                        winningNumberEl.style.transform = `rotate(${-normalizedRotation}deg)`;
                    }
                }, 2000);
            }

            // Calculate results with the actual winning number
            this.calculateRouletteResults(actualWinningNumber);
        }, 500);
    }

    showRouletteResult(winningNumber, color) {
        const wheel = document.getElementById('roulette-wheel');
        const message = document.createElement('div');
        message.className = 'roulette-result';
        message.innerHTML = `
            <div class="winning-number ${color}">
                ${winningNumber}
            </div>
            <div class="winning-color">${color.toUpperCase()}</div>
        `;
        message.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            z-index: 20;
            animation: fadeInScale 0.5s ease-out;
        `;

        wheel.appendChild(message);

        // Remove result message after 3 seconds
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 3000);
    }

    calculateRouletteResults(winningNumber) {
        let totalWinnings = 0;
        let winningBets = [];

        // Determine color of winning number
        let winningColor = 'green';
        if (this.rouletteNumbers.red.includes(winningNumber)) {
            winningColor = 'red';
        } else if (this.rouletteNumbers.black.includes(winningNumber)) {
            winningColor = 'black';
        }

        // Check each bet
        this.rouletteBets.forEach(bet => {
            let isWinner = false;
            let payout = 0;

            switch (bet.type) {
                case 'number':
                    if (bet.number === winningNumber) {
                        isWinner = true;
                        payout = bet.amount * 35; // 35:1 payout
                    }
                    break;
                case 'red':
                    if (winningColor === 'red') {
                        isWinner = true;
                        payout = bet.amount * 2; // 1:1 payout
                    }
                    break;
                case 'black':
                    if (winningColor === 'black') {
                        isWinner = true;
                        payout = bet.amount * 2; // 1:1 payout
                    }
                    break;
                case 'odd':
                    if (winningNumber > 0 && winningNumber % 2 === 1) {
                        isWinner = true;
                        payout = bet.amount * 2; // 1:1 payout
                    }
                    break;
                case 'even':
                    if (winningNumber > 0 && winningNumber % 2 === 0) {
                        isWinner = true;
                        payout = bet.amount * 2; // 1:1 payout
                    }
                    break;
                case 'low':
                    if (winningNumber >= 1 && winningNumber <= 18) {
                        isWinner = true;
                        payout = bet.amount * 2; // 1:1 payout
                    }
                    break;
                case 'high':
                    if (winningNumber >= 19 && winningNumber <= 36) {
                        isWinner = true;
                        payout = bet.amount * 2; // 1:1 payout
                    }
                    break;
                case 'dozen1':
                    if (winningNumber >= 1 && winningNumber <= 12) {
                        isWinner = true;
                        payout = bet.amount * 3; // 2:1 payout
                    }
                    break;
                case 'dozen2':
                    if (winningNumber >= 13 && winningNumber <= 24) {
                        isWinner = true;
                        payout = bet.amount * 3; // 2:1 payout
                    }
                    break;
                case 'dozen3':
                    if (winningNumber >= 25 && winningNumber <= 36) {
                        isWinner = true;
                        payout = bet.amount * 3; // 2:1 payout
                    }
                    break;
            }

            if (isWinner) {
                totalWinnings += payout;
                winningBets.push(bet);
            }
        });

        // Update balance and display results
        this.balance += totalWinnings;
        this.updateBalance();

        // Add to history
        this.rouletteHistory.unshift({
            number: winningNumber,
            color: winningColor
        });
        if (this.rouletteHistory.length > 20) {
            this.rouletteHistory.pop();
        }
        this.updateRouletteHistory();

        // Show results
        if (totalWinnings > 0) {
            this.showMessage(`🎯 Winner! ${winningNumber} (${winningColor.toUpperCase()}) - Won $${totalWinnings.toLocaleString()}!`, 'win');
        } else {
            this.showMessage(`🎯 ${winningNumber} (${winningColor.toUpperCase()}) - Better luck next time!`, 'lose');
        }

        // Clear bets for next round
        this.rouletteBets = [];
        this.updateRouletteBetsDisplay();
    }

    updateRouletteHistory() {
        const historyList = document.getElementById('roulette-history-list');
        if (!historyList) return;

        if (this.rouletteHistory.length === 0) {
            historyList.innerHTML = '<div class="no-history">No spins yet</div>';
            return;
        }

        historyList.innerHTML = this.rouletteHistory.map(result => `
        <div class="history-item ${result.color}">
            ${result.number}
        </div>
    `).join('');
    }

    // Theme system methods
    setupThemesListeners() {
        // Theme switching is handled by onclick attributes in HTML
        this.updateThemeDisplay();

        // Add click listeners to realm cards
        document.querySelectorAll('.realm-card').forEach(card => {
            card.addEventListener('click', () => {
                const theme = card.dataset.theme;
                const unlockLevel = parseInt(card.dataset.unlockLevel) || 1;

                if (this.vipLevel >= unlockLevel && theme) {
                    this.switchTheme(theme);
                } else if (this.vipLevel < unlockLevel) {
                    const vipNames = [
                        'Bronze', 'Bronze+', 'Silver', 'Silver+', 'Gold', 'Gold+',
                        'Platinum', 'Platinum+', 'Diamond', 'Diamond+', 'Ruby', 'Ruby+',
                        'Emerald', 'Emerald+', 'Sapphire', 'Sapphire+', 'Elite', 'Elite+',
                        'Legendary', 'Legendary+', 'Mythical', 'Mythical+', 'Celestial', 'Celestial+',
                        'Divine', 'Divine+', 'Transcendent', 'Transcendent+', 'Omnipotent', 'Omnipotent+',
                        'Cosmic', 'Cosmic+', 'Universal', 'Universal+', 'Infinite', 'Infinite+',
                        'Eternal', 'Eternal+', 'Godlike', 'APEX'
                    ];
                    const requiredVip = vipNames[unlockLevel - 1] || `Level ${unlockLevel}`;
                    this.showMessage(`🔒 Realm locked! Requires VIP ${requiredVip}`, 'lose');
                }
            });
        });

        // Add click listeners to card designs
        document.querySelectorAll('.card-design').forEach(design => {
            design.addEventListener('click', () => {
                const cards = design.dataset.cards;
                const unlockLevel = parseInt(design.dataset.unlockLevel) || 1;

                if (this.vipLevel >= unlockLevel && cards) {
                    this.currentCards = cards;
                    this.updateThemeDisplay();
                    // Refresh the card display to show new design
                    if (this.gameInProgress || this.playerHands[0].length > 0 || this.dealerHand.length > 0) {
                        this.updateDisplay();
                    }
                    this.showMessage(`🃏 Card design changed to ${cards.toUpperCase()}! 🃏`, 'win');
                } else if (this.vipLevel < unlockLevel) {
                    const vipNames = [
                        'Bronze', 'Bronze+', 'Silver', 'Silver+', 'Gold', 'Gold+',
                        'Platinum', 'Platinum+', 'Diamond', 'Diamond+', 'Ruby', 'Ruby+',
                        'Emerald', 'Emerald+', 'Sapphire', 'Sapphire+', 'Elite', 'Elite+',
                        'Legendary', 'Legendary+', 'Mythical', 'Mythical+', 'Celestial', 'Celestial+',
                        'Divine', 'Divine+', 'Transcendent', 'Transcendent+', 'Omnipotent', 'Omnipotent+',
                        'Cosmic', 'Cosmic+', 'Universal', 'Universal+', 'Infinite', 'Infinite+',
                        'Eternal', 'Eternal+', 'Godlike', 'APEX'
                    ];
                    const requiredVip = vipNames[unlockLevel - 1] || `Level ${unlockLevel}`;
                    this.showMessage(`🔒 Card design locked! Requires VIP ${requiredVip}`, 'lose');
                }
            });
        });
    }

    updateThemeDisplay() {
        // Update realm cards based on VIP level
        document.querySelectorAll('.realm-card').forEach(card => {
            const unlockLevel = parseInt(card.dataset.unlockLevel) || 1;
            const theme = card.dataset.theme;

            if (this.vipLevel >= unlockLevel) {
                card.classList.remove('locked');
                card.style.pointerEvents = 'auto';
                card.style.cursor = 'pointer';

                // Update status text
                const statusEl = card.querySelector('.realm-status');
                if (statusEl && !statusEl.classList.contains('active-status')) {
                    statusEl.innerHTML = 'UNLOCKED - CLICK TO ACTIVATE';
                    statusEl.className = 'realm-status unlocked-status';
                }

                // Check if this is the active theme
                if (theme === this.currentTheme) {
                    card.classList.add('active');
                    if (statusEl) {
                        statusEl.innerHTML = 'CURRENTLY ACTIVE';
                        statusEl.className = 'realm-status active-status';
                    }
                } else {
                    card.classList.remove('active');
                }
            } else {
                card.classList.add('locked');
                card.style.pointerEvents = 'none';
                card.style.cursor = 'not-allowed';
                card.classList.remove('active');
            }
        });

        // Update card designs based on VIP level
        document.querySelectorAll('.card-design').forEach(design => {
            const unlockLevel = parseInt(design.dataset.unlockLevel) || 1;
            const cards = design.dataset.cards;

            if (this.vipLevel >= unlockLevel) {
                design.classList.remove('locked');
                design.style.pointerEvents = 'auto';
                design.style.cursor = 'pointer';

                // Update status text
                const statusEl = design.querySelector('.design-status');
                if (statusEl && !statusEl.classList.contains('active-design')) {
                    statusEl.innerHTML = 'UNLOCKED';
                    statusEl.className = 'design-status unlocked-design';
                }

                // Check if this is the active card design
                if (cards === this.currentCards) {
                    design.classList.add('active');
                    if (statusEl) {
                        statusEl.innerHTML = 'EQUIPPED';
                        statusEl.className = 'design-status active-design';
                    }
                } else {
                    design.classList.remove('active');
                }
            } else {
                design.classList.add('locked');
                design.style.pointerEvents = 'none';
                design.style.cursor = 'not-allowed';
                design.classList.remove('active');
            }
        });
    }

    switchTheme(theme) {
        this.currentTheme = theme;

        // Update active theme display for both old and new selectors
        document.querySelectorAll('.theme-option, .realm-card').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.theme === theme) {
                option.classList.add('active');
                const status = option.querySelector('.theme-status, .realm-status');
                if (status && status.classList.contains('active-status')) {
                    status.textContent = 'CURRENTLY ACTIVE';
                } else if (status && status.textContent === 'ACTIVE') {
                    status.textContent = 'ACTIVE';
                }
            }
        });

        // Apply theme to game container
        this.applyTheme(theme);
        this.showMessage(`🎨 Realm changed to ${theme.toUpperCase()}! 🎨`, 'win');
    }

    randomTheme() {
        const themes = ['tavern', 'vegas', 'monte-carlo', 'underground', 'cosmic', 'royal', 'holographic', 'legendary', 'apex'];
        const availableThemes = themes.filter(theme => {
            // Check if theme is unlocked based on VIP level
            const unlockLevels = {
                'tavern': 1,
                'vegas': 5,
                'monte-carlo': 10,
                'underground': 15,
                'cosmic': 30,
                'royal': 25,
                'holographic': 35,
                'legendary': 38,
                'apex': 40
            };
            return this.vipLevel >= unlockLevels[theme];
        });

        if (availableThemes.length > 0) {
            const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
            this.switchTheme(randomTheme);
            this.showMessage(`🎲 Random realm selected: ${randomTheme.toUpperCase()}! 🎲`, 'win');
        } else {
            this.showMessage('🔒 No unlocked realms available for random selection!', 'lose');
        }
    }

    applyTheme(theme) {
        if (!this.themesEnabled) return;

        const body = document.body;
        const gameContainer = document.querySelector('.game-container');

        if (gameContainer) {
            // Apply theme-specific styles
            switch (theme) {
                case 'vegas':
                    gameContainer.style.background = 'linear-gradient(145deg, #ff1493, #ffd700)';
                    gameContainer.style.border = '2px solid #ffd700';
                    break;
                case 'cosmic':
                    gameContainer.style.background = 'linear-gradient(145deg, #4b0082, #00ffff)';
                    gameContainer.style.border = '2px solid #00ffff';
                    break;
                case 'monte-carlo':
                    gameContainer.style.background = 'linear-gradient(145deg, #4169e1, #ffffff)';
                    gameContainer.style.border = '2px solid #4169e1';
                    break;
                case 'underground':
                    gameContainer.style.background = 'linear-gradient(145deg, #2f2f2f, #8b0000)';
                    gameContainer.style.border = '2px solid #8b0000';
                    break;
                case 'royal':
                    gameContainer.style.background = 'linear-gradient(145deg, #800080, #ffd700)';
                    gameContainer.style.border = '2px solid #ffd700';
                    break;
                case 'holographic':
                    gameContainer.style.background = 'linear-gradient(145deg, #00ffff, #ff00ff)';
                    gameContainer.style.border = '2px solid #00ffff';
                    break;
                case 'legendary':
                    gameContainer.style.background = 'linear-gradient(145deg, #8b0000, #ffd700)';
                    gameContainer.style.border = '2px solid #ff4500';
                    break;
                case 'apex':
                    gameContainer.style.background = 'linear-gradient(145deg, #000000, #ffffff, #ffd700)';
                    gameContainer.style.border = '2px solid #ffffff';
                    break;
                case 'tavern':
                    gameContainer.style.background = 'linear-gradient(145deg, #654321, #8b4513)';
                    gameContainer.style.border = '2px solid #8b4513';
                    break;
            }
        }
    }

    toggleThemes() {
        this.themesEnabled = !this.themesEnabled;
        const toggleBtn = document.getElementById('toggle-themes-btn');

        if (this.themesEnabled) {
            // Re-enable themes
            this.applyTheme(this.currentTheme);
            if (toggleBtn) {
                toggleBtn.innerHTML = '<span class="btn-icon">🎨</span><span class="btn-text">DISABLE THEMES</span><div class="btn-glow"></div>';
                toggleBtn.className = 'control-btn primary';
            }
            this.showMessage('🎨 Theme Engine ACTIVATED! 🎨', 'win');
        } else {
            // Disable themes - remove all theme classes and reset styles
            const gameContainer = document.querySelector('.game-container');
            if (gameContainer) {
                gameContainer.style.background = '';
                gameContainer.style.border = '';
            }

            if (toggleBtn) {
                toggleBtn.innerHTML = '<span class="btn-icon">🎨</span><span class="btn-text">ENABLE THEMES</span><div class="btn-glow"></div>';
                toggleBtn.className = 'control-btn secondary';
            }
            this.showMessage('🎨 Theme Engine DEACTIVATED! 🎨', 'lose');
        }
    }

    // Developer tools methods
    setupDevListeners() {
        // Dev save/load listeners
        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', () => this.saveProgress());
        }
        if (this.loadBtn) {
            this.loadBtn.addEventListener('click', () => this.loadProgress());
        }

        // Slot odds controls
        this.setupSlotOddsControls();
    }

    setupSlotOddsControls() {
        const jackpotSlider = document.getElementById('jackpot-odds');
        const bigWinSlider = document.getElementById('big-win-odds');
        const mediumWinSlider = document.getElementById('medium-win-odds');
        const smallWinSlider = document.getElementById('small-win-odds');

        if (jackpotSlider) {
            jackpotSlider.addEventListener('input', () => {
                this.slotOdds.jackpot = parseFloat(jackpotSlider.value) / 100;
                this.updateOddsDisplay();
            });
        }

        if (bigWinSlider) {
            bigWinSlider.addEventListener('input', () => {
                this.slotOdds.bigWin = parseFloat(bigWinSlider.value) / 100;
                this.updateOddsDisplay();
            });
        }

        if (mediumWinSlider) {
            mediumWinSlider.addEventListener('input', () => {
                this.slotOdds.mediumWin = parseFloat(mediumWinSlider.value) / 100;
                this.updateOddsDisplay();
            });
        }

        if (smallWinSlider) {
            smallWinSlider.addEventListener('input', () => {
                this.slotOdds.smallWin = parseFloat(smallWinSlider.value) / 100;
                this.updateOddsDisplay();
            });
        }

        // Initialize display
        this.updateOddsDisplay();
    }

    updateOddsDisplay() {
        const jackpotDisplay = document.getElementById('jackpot-display');
        const bigWinDisplay = document.getElementById('big-win-display');
        const mediumWinDisplay = document.getElementById('medium-win-display');
        const smallWinDisplay = document.getElementById('small-win-display');
        const totalWinRate = document.getElementById('total-win-rate');
        const lossRate = document.getElementById('loss-rate');

        if (jackpotDisplay) jackpotDisplay.textContent = (this.slotOdds.jackpot * 100).toFixed(1) + '%';
        if (bigWinDisplay) bigWinDisplay.textContent = (this.slotOdds.bigWin * 100).toFixed(1) + '%';
        if (mediumWinDisplay) mediumWinDisplay.textContent = (this.slotOdds.mediumWin * 100).toFixed(1) + '%';
        if (smallWinDisplay) smallWinDisplay.textContent = (this.slotOdds.smallWin * 100).toFixed(1) + '%';

        const totalWin = (this.slotOdds.jackpot + this.slotOdds.bigWin + this.slotOdds.mediumWin + this.slotOdds.smallWin) * 100;
        const totalLoss = 100 - totalWin;

        if (totalWinRate) totalWinRate.textContent = totalWin.toFixed(1) + '%';
        if (lossRate) lossRate.textContent = totalLoss.toFixed(1) + '%';
    }

    setSlotOdds(preset) {
        const presets = {
            rigged: { jackpot: 0.05, bigWin: 0.15, mediumWin: 0.25, smallWin: 0.35 }, // 80% win
            generous: { jackpot: 0.03, bigWin: 0.12, mediumWin: 0.20, smallWin: 0.25 }, // 60% win
            normal: { jackpot: 0.005, bigWin: 0.03, mediumWin: 0.08, smallWin: 0.25 }, // 36.5% win
            casino: { jackpot: 0.002, bigWin: 0.015, mediumWin: 0.05, smallWin: 0.18 }, // 24.7% win
            brutal: { jackpot: 0.001, bigWin: 0.01, mediumWin: 0.04, smallWin: 0.15 } // 20.1% win (old normal)
        };

        if (presets[preset]) {
            this.slotOdds = { ...presets[preset] };

            // Update sliders
            const jackpotSlider = document.getElementById('jackpot-odds');
            const bigWinSlider = document.getElementById('big-win-odds');
            const mediumWinSlider = document.getElementById('medium-win-odds');
            const smallWinSlider = document.getElementById('small-win-odds');

            if (jackpotSlider) jackpotSlider.value = this.slotOdds.jackpot * 100;
            if (bigWinSlider) bigWinSlider.value = this.slotOdds.bigWin * 100;
            if (mediumWinSlider) mediumWinSlider.value = this.slotOdds.mediumWin * 100;
            if (smallWinSlider) smallWinSlider.value = this.slotOdds.smallWin * 100;

            this.updateOddsDisplay();
            this.showMessage(`Slot odds set to ${preset.toUpperCase()} mode!`, 'win');
        }
    }

    setupSecretAccess() {
        // Simple dev code access - just type "DEV" anywhere in the game
        let devCode = '';
        let lastKeyTime = 0;

        document.addEventListener('keydown', (event) => {
            const currentTime = Date.now();

            // Reset if too much time has passed (3 seconds)
            if (currentTime - lastKeyTime > 3000) {
                devCode = '';
            }

            lastKeyTime = currentTime;

            // Add typed character to sequence (only letters)
            if (event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
                devCode += event.key.toUpperCase();

                // Check for dev code
                if (devCode === 'DEV') {
                    this.unlockDevTab();
                    devCode = '';
                } else if (devCode.length > 3 || !('DEV'.startsWith(devCode))) {
                    devCode = '';
                }
            }
        });

        // Alternative: Click the balance 5 times quickly
        let balanceClicks = 0;
        let lastClickTime = 0;

        if (this.balanceEl) {
            this.balanceEl.addEventListener('click', () => {
                const currentTime = Date.now();

                if (currentTime - lastClickTime > 2000) {
                    balanceClicks = 0;
                }

                balanceClicks++;
                lastClickTime = currentTime;

                if (balanceClicks >= 5) {
                    this.unlockDevTab();
                    balanceClicks = 0;
                }
            });
        }
    }

    unlockDevTab() {
        this.devTabUnlocked = true;

        // Show the Dev tab button with effects
        const devTabBtn = document.getElementById('dev-tab');
        if (devTabBtn) {
            devTabBtn.style.display = 'block';
            devTabBtn.classList.add('unlocked');
            devTabBtn.style.boxShadow = '0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 0, 0, 0.8), 0 0 90px rgba(0, 255, 255, 0.6)';
            devTabBtn.style.animation = 'epicDevUnlock 5s ease-in-out';
        }

        // Show epic authentication screen
        this.showEpicUnlockAnimation();
    }

    showDevUnlockMessage() {
        // Create simple unlock notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
            border: 3px solid #ffd700;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            color: #ffd700;
            font-family: 'Georgia', serif;
            font-size: 1.4em;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.5);
            animation: devNotification 4s ease-in-out forwards;
        `;

        notification.innerHTML = `
            <div style="font-size: 2em; margin-bottom: 15px;">⚙️ DEV ACCESS GRANTED ⚙️</div>
            <div style="color: #c9a876; font-size: 0.8em; font-style: italic;">Developer tools are now available</div>
        `;

        // Add notification styles
        const notificationStyles = document.createElement('style');
        notificationStyles.textContent = `
            @keyframes devNotification {
                0% { 
                    opacity: 0; 
                    transform: translate(-50%, -50%) scale(0.5); 
                }
                20% { 
                    opacity: 1; 
                    transform: translate(-50%, -50%) scale(1.1); 
                }
                40% { 
                    transform: translate(-50%, -50%) scale(0.95); 
                }
                60% { 
                    transform: translate(-50%, -50%) scale(1); 
                }
                80% { 
                    opacity: 1; 
                }
                100% { 
                    opacity: 0; 
                    transform: translate(-50%, -50%) scale(1); 
                }
            }
            
            @keyframes devUnlock {
                0%, 100% { 
                    box-shadow: 0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 0, 0, 0.8), 0 0 90px rgba(0, 255, 255, 0.6);
                }
                50% { 
                    box-shadow: 0 0 50px rgba(255, 215, 0, 1), 0 0 80px rgba(255, 0, 0, 1), 0 0 120px rgba(0, 255, 255, 0.8);
                    transform: scale(1.05);
                }
            }
        `;

        document.head.appendChild(notificationStyles);
        document.body.appendChild(notification);

        // Show success message in game
        this.showMessage('🔓 Developer tools unlocked! Check the Dev tab.', 'win');

        // Clean up after animation
        setTimeout(() => {
            if (notification.parentNode) notification.parentNode.removeChild(notification);
            if (notificationStyles.parentNode) notificationStyles.parentNode.removeChild(notificationStyles);

            // Reset dev tab animation
            if (devTabBtn) {
                devTabBtn.style.animation = '';
            }
        }, 4000);
    }

    showEpicUnlockAnimation() {
        // Create sinister authentication overlay matching the dark lore
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: 
                radial-gradient(circle at center, rgba(0,20,0,0.95) 0%, rgba(0,0,0,0.98) 70%),
                linear-gradient(45deg, rgba(139,0,0,0.1) 0%, rgba(0,0,0,0.9) 50%, rgba(139,0,0,0.1) 100%);
            z-index: 9999;
            pointer-events: none;
            animation: darkAuthentication 6s ease-in-out forwards;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Courier New', monospace;
        `;

        const authContainer = document.createElement('div');
        authContainer.innerHTML = `
            <div class="auth-logo">
                <div class="skull-symbol">◇♧♡♤</div>
                <div class="auth-rings">
                    <div class="ring ring-1"></div>
                    <div class="ring ring-2"></div>
                    <div class="ring ring-3"></div>
                </div>
            </div>
            <div class="auth-text">
                <div class="agent-id">ORCASTORM</div>
                <div class="auth-status">AUTHENTICATING...</div>
                <div class="auth-progress">
                    <div class="progress-bar"></div>
                </div>
                <div class="auth-warnings">
                    <div class="warning-line">⚠️ CLASSIFIED SYSTEM ACCESS</div>
                    <div class="warning-line">⚠️ PSYCHOLOGICAL MANIPULATION PROTOCOLS</div>
                    <div class="warning-line">⚠️ UNAUTHORIZED ACCESS MONITORED</div>
                </div>
                <div class="auth-complete">ACCESS GRANTED - WELCOME ORCASTORM</div>
            </div>
        `;

        authContainer.style.cssText = `
            text-align: center;
            color: #00ff41;
            animation: authSequence 6s ease-in-out forwards;
        `;

        // Add dynamic styles for the authentication elements
        const authStyles = document.createElement('style');
        authStyles.textContent = `
            .auth-logo {
                position: relative;
                margin-bottom: 40px;
            }
            
            .skull-symbol {
                font-size: 2.5em;
                text-shadow: 0 0 20px #00ff41, 0 0 40px #00ff41;
                animation: skullPulse 2s ease-in-out infinite;
                position: relative;
                z-index: 3;
                letter-spacing: 2px;
                line-height: 1;
            }
            
            .auth-rings {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            
            .ring {
                position: absolute;
                border: 2px solid #00ff41;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: 0.6;
            }
            
            .ring-1 {
                width: 120px;
                height: 120px;
                animation: ringRotate 4s linear infinite;
                border-style: dashed;
            }
            
            .ring-2 {
                width: 160px;
                height: 160px;
                animation: ringRotate 6s linear infinite reverse;
                border-top-color: transparent;
                border-left-color: transparent;
            }
            
            .ring-3 {
                width: 200px;
                height: 200px;
                animation: ringRotate 8s linear infinite;
                border-right-color: transparent;
                border-bottom-color: transparent;
            }
            
            .agent-id {
                font-size: 1.8em;
                font-weight: bold;
                margin-bottom: 20px;
                letter-spacing: 3px;
                text-shadow: 0 0 10px #00ff41;
                animation: textGlow 3s ease-in-out infinite;
            }
            
            .auth-status {
                font-size: 1.2em;
                margin-bottom: 30px;
                opacity: 0;
                animation: typewriter 1s ease-in-out 1s forwards;
            }
            
            .auth-progress {
                width: 300px;
                height: 4px;
                background: rgba(0,255,65,0.2);
                margin: 0 auto 30px;
                border-radius: 2px;
                overflow: hidden;
            }
            
            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #00ff41, #00cc33, #00ff41);
                width: 0%;
                animation: progressFill 4s ease-in-out 1.5s forwards;
                box-shadow: 0 0 10px #00ff41;
            }
            
            .auth-warnings {
                margin: 30px 0;
                opacity: 0;
                animation: warningsAppear 1s ease-in-out 3s forwards;
            }
            
            .warning-line {
                font-size: 0.9em;
                margin: 8px 0;
                color: #ff4444;
                text-shadow: 0 0 5px #ff4444;
                animation: warningBlink 2s ease-in-out infinite;
            }
            
            .warning-line:nth-child(2) { animation-delay: 0.3s; }
            .warning-line:nth-child(3) { animation-delay: 0.6s; }
            
            .auth-complete {
                font-size: 1.4em;
                font-weight: bold;
                color: #00ff41;
                text-shadow: 0 0 15px #00ff41;
                opacity: 0;
                animation: finalMessage 1s ease-in-out 5s forwards;
                letter-spacing: 2px;
            }
            
            @keyframes darkAuthentication {
                0% { opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { opacity: 0; }
            }
            
            @keyframes authSequence {
                0% { transform: scale(0.8); opacity: 0; }
                10% { transform: scale(1); opacity: 1; }
                90% { opacity: 1; }
                100% { opacity: 0; }
            }
            
            @keyframes skullPulse {
                0%, 100% { transform: scale(1); text-shadow: 0 0 20px #00ff41, 0 0 40px #00ff41; }
                50% { transform: scale(1.1); text-shadow: 0 0 30px #00ff41, 0 0 60px #00ff41, 0 0 80px #00ff41; }
            }
            
            @keyframes ringRotate {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
            }
            
            @keyframes textGlow {
                0%, 100% { text-shadow: 0 0 10px #00ff41; }
                50% { text-shadow: 0 0 20px #00ff41, 0 0 30px #00ff41; }
            }
            
            @keyframes typewriter {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            
            @keyframes progressFill {
                0% { width: 0%; }
                100% { width: 100%; }
            }
            
            @keyframes warningsAppear {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes warningBlink {
                0%, 70% { opacity: 1; }
                85% { opacity: 0.3; }
                100% { opacity: 1; }
            }
            
            @keyframes finalMessage {
                0% { opacity: 0; transform: scale(0.8); }
                100% { opacity: 1; transform: scale(1); }
            }
        `;

        document.head.appendChild(authStyles);
        overlay.appendChild(authContainer);
        document.body.appendChild(overlay);

        // Add Matrix-style falling characters for atmosphere
        this.createMatrixRain();

        setTimeout(() => {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            if (authStyles.parentNode) authStyles.parentNode.removeChild(authStyles);
        }, 6000);
    }

    createMatrixRain() {
        // Create Matrix-style falling characters for extra atmosphere
        for (let i = 0; i < 15; i++) {
            const rain = document.createElement('div');
            const chars = '01AGENT$CASINO♠♦♣♥◇♧♡♤⚠';
            rain.textContent = chars[Math.floor(Math.random() * chars.length)];
            rain.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * 100}vw;
                color: #00ff41;
                font-family: 'Courier New', monospace;
                font-size: ${Math.random() * 20 + 10}px;
                z-index: 9998;
                pointer-events: none;
                opacity: ${Math.random() * 0.7 + 0.3};
                animation: matrixFall${i} ${Math.random() * 3 + 2}s linear forwards;
            `;

            const fallStyle = document.createElement('style');
            fallStyle.textContent = `
                @keyframes matrixFall${i} {
                    0% { transform: translateY(-50px); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
            `;

            document.head.appendChild(fallStyle);
            document.body.appendChild(rain);

            setTimeout(() => {
                if (rain.parentNode) rain.parentNode.removeChild(rain);
                if (fallStyle.parentNode) fallStyle.parentNode.removeChild(fallStyle);
            }, 5000);
        }
    }

    setupHoudiniEasterEgg() {
        let typedSequence = '';
        let lastKeyTime = 0;

        // Define all easter egg sequences and their corresponding quotes
        const easterEggs = [
            {
                sequence: 'mundus vult decipi, ergo decipiatur',
                quote: '"What the eyes see and the ears hear, the mind believes"',
                author: '- Harry Houdini'
            },
            {
                sequence: 'non omne quod nitet aurum est',
                quote: '"All that glitters is not gold."',
                author: '— William Shakespeare'
            },
            {
                sequence: 'species decipit',
                quote: '"Appearances are often deceiving."',
                author: '— Aesop'
            },
            {
                sequence: 'prima facie fallit',
                quote: '"Things are not always as they seem; the first appearance deceives many."',
                author: '— Phaedrus'
            },
            {
                sequence: 'oculus videt quod mens',
                quote: '"The eye sees only what the mind is prepared to comprehend."',
                author: '— Henri Bergson'
            },
            {
                sequence: 'ne crede nimium',
                quote: '"Trust not too much to appearances."',
                author: '— Virgil'
            },
            {
                sequence: 'facies falsa',
                quote: '"False faces are worn by those who wish to hide the truth."',
                author: '— Unknown'
            },
            {
                sequence: 'mendacium periculosum',
                quote: '"The most dangerous lies are the ones that almost feel true."',
                author: '— Unknown'
            },
            {
                sequence: 'scientia falsa',
                quote: '"Beware of false knowledge; it is more dangerous than ignorance."',
                author: '— George Bernard Shaw'
            },
            {
                sequence: 'persona plus quam facies',
                quote: '"The mask tells us more than the face."',
                author: '— Oscar Wilde'
            },
            {
                sequence: 'silentium mendax',
                quote: '"Sometimes the loudest lies are told in silence."',
                author: '— Unknown'
            },
            {
                sequence: 'diabolus scripturam',
                quote: '"The devil can cite Scripture for his purpose."',
                author: '— William Shakespeare'
            }
        ];

        document.addEventListener('keydown', (event) => {
            const currentTime = Date.now();

            // Reset if too much time has passed (5 seconds)
            if (currentTime - lastKeyTime > 5000) {
                typedSequence = '';
            }

            lastKeyTime = currentTime;

            // Add typed character to sequence (only letters, spaces, and commas)
            if (event.key.length === 1 && /[a-zA-Z, ]/.test(event.key)) {
                typedSequence += event.key.toLowerCase();

                // Check each easter egg sequence
                for (const easterEgg of easterEggs) {
                    // Keep only the last part that could match this sequence
                    if (typedSequence.length > easterEgg.sequence.length) {
                        const relevantPart = typedSequence.slice(-easterEgg.sequence.length);
                        if (relevantPart === easterEgg.sequence) {
                            this.showDeceptionEasterEgg(easterEgg.quote, easterEgg.author);
                            typedSequence = ''; // Reset after triggering
                            return;
                        }
                    } else if (typedSequence === easterEgg.sequence) {
                        this.showDeceptionEasterEgg(easterEgg.quote, easterEgg.author);
                        typedSequence = ''; // Reset after triggering
                        return;
                    }
                }

                // Trim sequence if it gets too long and doesn't match any pattern
                const maxLength = Math.max(...easterEggs.map(e => e.sequence.length));
                if (typedSequence.length > maxLength) {
                    typedSequence = typedSequence.slice(-maxLength);
                }
            }
        });
    }

    showDeceptionEasterEgg(quote, author) {
        // Create the deception easter egg overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: 
                radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 70%),
                linear-gradient(45deg, rgba(75,0,130,0.2) 0%, rgba(0,0,0,0.9) 50%, rgba(75,0,130,0.2) 100%);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Georgia', serif;
            animation: houdiniAppear 8s ease-in-out forwards;
        `;

        const deceptionContainer = document.createElement('div');
        deceptionContainer.innerHTML = `
            <div class="houdini-eyeball">👁️</div>
            <div class="houdini-quote">
                <div class="quote-text">${quote}</div>
                <div class="quote-author">${author}</div>
            </div>
        `;

        deceptionContainer.style.cssText = `
            text-align: center;
            color: #f4e4c1;
            animation: houdiniSequence 8s ease-in-out forwards;
        `;

        // Add dynamic styles for the deception easter egg
        const deceptionStyles = document.createElement('style');
        deceptionStyles.textContent = `
            .houdini-eyeball {
                font-size: 8em;
                margin-bottom: 40px;
                animation: eyeballStare 3s ease-in-out infinite;
                text-shadow: 
                    0 0 30px rgba(255,255,255,0.8),
                    0 0 60px rgba(255,255,255,0.6),
                    0 0 90px rgba(255,255,255,0.4);
                filter: drop-shadow(0 0 20px rgba(255,255,255,0.5));
                position: relative;
            }
            
            .houdini-eyeball::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 200px;
                height: 200px;
                border: 3px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                animation: eyeballRing 4s ease-in-out infinite;
            }
            
            .houdini-quote {
                max-width: 600px;
                opacity: 0;
                animation: quoteAppear 2s ease-in-out 3s forwards;
            }
            
            .quote-text {
                font-size: 1.8em;
                font-style: italic;
                margin-bottom: 20px;
                line-height: 1.4;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
                color: #c9a876;
                animation: textGlow 3s ease-in-out infinite;
            }
            
            .quote-author {
                font-size: 1.3em;
                font-weight: bold;
                color: #8b7355;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
                animation: authorGlow 3s ease-in-out infinite 0.5s;
            }
            
            @keyframes houdiniAppear {
                0% { opacity: 0; }
                10% { opacity: 1; }
                85% { opacity: 1; }
                100% { opacity: 0; }
            }
            
            @keyframes houdiniSequence {
                0% { transform: scale(0.8); opacity: 0; }
                10% { transform: scale(1); opacity: 1; }
                85% { opacity: 1; }
                100% { opacity: 0; }
            }
            
            @keyframes eyeballStare {
                0%, 70% { 
                    transform: scale(1) rotateY(0deg); 
                    text-shadow: 
                        0 0 30px rgba(255,255,255,0.8),
                        0 0 60px rgba(255,255,255,0.6),
                        0 0 90px rgba(255,255,255,0.4);
                }
                15% { 
                    transform: scale(1.1) rotateY(5deg); 
                    text-shadow: 
                        0 0 40px rgba(255,255,255,1),
                        0 0 80px rgba(255,255,255,0.8),
                        0 0 120px rgba(255,255,255,0.6);
                }
                30% { 
                    transform: scale(0.95) rotateY(-5deg); 
                }
                45% { 
                    transform: scale(1.05) rotateY(3deg); 
                }
                60% { 
                    transform: scale(1) rotateY(-2deg); 
                }
                85% { 
                    transform: scale(1.2) rotateY(0deg); 
                    text-shadow: 
                        0 0 50px rgba(255,255,255,1),
                        0 0 100px rgba(255,255,255,0.9),
                        0 0 150px rgba(255,255,255,0.7);
                }
                100% { 
                    transform: scale(1) rotateY(0deg); 
                    text-shadow: 
                        0 0 30px rgba(255,255,255,0.8),
                        0 0 60px rgba(255,255,255,0.6),
                        0 0 90px rgba(255,255,255,0.4);
                }
            }
            
            @keyframes eyeballRing {
                0%, 100% { 
                    transform: translate(-50%, -50%) scale(1); 
                    opacity: 0.3; 
                }
                50% { 
                    transform: translate(-50%, -50%) scale(1.2); 
                    opacity: 0.6; 
                }
            }
            
            @keyframes quoteAppear {
                0% { 
                    opacity: 0; 
                    transform: translateY(30px); 
                }
                100% { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            @keyframes textGlow {
                0%, 100% { 
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(201,168,118,0.5); 
                }
                50% { 
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(201,168,118,0.8), 0 0 30px rgba(201,168,118,0.6); 
                }
            }
            
            @keyframes authorGlow {
                0%, 100% { 
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.8), 0 0 8px rgba(139,115,85,0.4); 
                }
                50% { 
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.8), 0 0 15px rgba(139,115,85,0.7), 0 0 25px rgba(139,115,85,0.5); 
                }
            }
        `;

        document.head.appendChild(deceptionStyles);
        overlay.appendChild(deceptionContainer);
        document.body.appendChild(overlay);

        // Add mystical sound effect (if audio is available)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 1);
            oscillator.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 2);

            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.5);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 2);
        } catch (e) {
            // Audio not available, continue without sound
        }

        // Clean up after animation
        setTimeout(() => {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            if (deceptionStyles.parentNode) deceptionStyles.parentNode.removeChild(deceptionStyles);
        }, 8000);
    }

    // Save/Load system
    saveProgress() {
        const saveData = {
            balance: this.balance,
            vipLevel: this.vipLevel,
            totalWagered: this.totalWagered,
            gamesPlayed: this.gamesPlayed,
            gamesWon: this.gamesWon,
            gamesLost: this.gamesLost,
            gamesPushed: this.gamesPushed,
            inventory: this.inventory,
            currentTheme: this.currentTheme
        };

        // Generate a random 8-character code
        const code = Math.random().toString(36).substring(2, 10).toUpperCase();
        localStorage.setItem(`blackjack_save_${code}`, JSON.stringify(saveData));

        const generatedCodeEl = document.getElementById('generated-code');
        if (generatedCodeEl) {
            generatedCodeEl.innerHTML = `
                <div class="save-code-display">
                    <strong>Save Code: ${code}</strong>
                    <div class="code-details">Balance: $${this.balance.toLocaleString()} | VIP: ${this.vipLevel}</div>
                </div>
            `;
        }

        this.showMessage(`Progress saved! Code: ${code}`, 'win');
    }

    loadProgress() {
        const code = this.loadCodeEl.value.trim().toUpperCase();
        if (!code) {
            this.showMessage('Please enter a save code!', 'lose');
            return;
        }

        const saveData = localStorage.getItem(`blackjack_save_${code}`);
        if (!saveData) {
            this.showMessage('Invalid save code!', 'lose');
            return;
        }

        try {
            const data = JSON.parse(saveData);
            this.balance = data.balance || 500;
            this.vipLevel = data.vipLevel || 1;
            this.totalWagered = data.totalWagered || 0;
            this.gamesPlayed = data.gamesPlayed || 0;
            this.gamesWon = data.gamesWon || 0;
            this.gamesLost = data.gamesLost || 0;
            this.gamesPushed = data.gamesPushed || 0;
            this.inventory = data.inventory || {};
            this.currentTheme = data.currentTheme || 'tavern';

            // Check if loaded VIP level is higher than what balance would normally allow
            const vipThresholds = [
                0, 2000, 5000, 10000, 25000, 50000, 100000, 200000, 500000, 1000000,
                2000000, 5000000, 10000000, 25000000, 50000000, 100000000, 200000000, 500000000, 1000000000, 2000000000,
                5000000000, 10000000000, 25000000000, 50000000000, 100000000000, 250000000000, 500000000000, 1000000000000, 2500000000000, 5000000000000,
                10000000000000, 25000000000000, 50000000000000, 100000000000000, 250000000000000, 500000000000000, 1000000000000000, 2500000000000000, 5000000000000000, 10000000000000000
            ];

            let balanceBasedVipLevel = 1;
            for (let i = vipThresholds.length - 1; i >= 0; i--) {
                if (this.balance >= vipThresholds[i]) {
                    balanceBasedVipLevel = i + 1;
                    break;
                }
            }

            // Set override flag if loaded VIP level is higher than balance-based level
            this.vipLevelOverride = this.vipLevel > balanceBasedVipLevel;

            this.updateBalance();
            // Don't call updateVIPStatus() as it recalculates VIP level based on balance
            // Instead, manually update the VIP display with the loaded level
            this.updateVIPDisplay();
            this.updateInventoryDisplay();
            this.applyTheme(this.currentTheme);

            this.showMessage(`Progress loaded! Welcome back, VIP Level ${this.vipLevel}!`, 'win');
            this.loadCodeEl.value = '';
        } catch (error) {
            this.showMessage('Corrupted save code!', 'lose');
        }
    }

    // Enhanced UI update methods
    updateDealerMood() {
        const moodEmoji = document.querySelector('.mood-emoji');
        const moodText = document.querySelector('.mood-text');

        if (!moodEmoji || !moodText) return;

        let mood, emoji, text;

        if (this.winningStreak >= 3) {
            mood = 'concerned';
            emoji = '😟';
            text = 'Dealer is getting concerned';
        } else if (this.losingStreak >= 3) {
            mood = 'pleased';
            emoji = '😊';
            text = 'Dealer is pleased';
        } else if (this.balance > 10000) {
            mood = 'impressed';
            emoji = '😮';
            text = 'Dealer is impressed';
        } else if (this.balance < 100) {
            mood = 'sympathetic';
            emoji = '😔';
            text = 'Dealer feels sympathetic';
        } else {
            mood = 'neutral';
            emoji = '😐';
            text = 'Dealer is feeling neutral';
        }

        moodEmoji.textContent = emoji;
        moodText.textContent = text;
    }

    updateTableActivity() {
        const activityText = document.querySelector('.activity-text');
        if (!activityText) return;

        let activity;
        if (this.gamesPlayed > 50) {
            activity = 'Very Active';
        } else if (this.gamesPlayed > 20) {
            activity = 'Active';
        } else if (this.gamesPlayed > 5) {
            activity = 'Moderate';
        } else {
            activity = 'Quiet';
        }

        activityText.textContent = `Table Activity: ${activity}`;
    }

    addSpectatorComment() {
        const spectatorCommentsEl = document.getElementById('spectator-comments');
        if (!spectatorCommentsEl) return;

        const comments = [
            { name: 'HighRoller23', text: 'This table is heating up!' },
            { name: 'LuckyLady88', text: 'Nice hand there!' },
            { name: 'CardShark99', text: 'I would have hit on that' },
            { name: 'VegasVet', text: 'Dealer is running hot tonight' },
            { name: 'ChipCollector', text: 'Good luck everyone!' },
            { name: 'BlackjackBoss', text: 'That was a close one' },
            { name: 'CasinoKing', text: 'The cards are speaking tonight' }
        ];

        const randomComment = comments[Math.floor(Math.random() * comments.length)];

        const commentEl = document.createElement('div');
        commentEl.className = 'spectator-comment';
        commentEl.innerHTML = `
            <span class="spectator-name">${randomComment.name}:</span>
            <span class="comment-text">"${randomComment.text}"</span>
        `;

        // Add with fade in animation
        commentEl.style.opacity = '0';
        commentEl.style.transform = 'translateY(10px)';
        spectatorCommentsEl.appendChild(commentEl);

        // Animate in
        setTimeout(() => {
            commentEl.style.transition = 'all 0.5s ease';
            commentEl.style.opacity = '1';
            commentEl.style.transform = 'translateY(0)';
        }, 100);

        // Remove old comments if too many
        const comments_elements = spectatorCommentsEl.querySelectorAll('.spectator-comment');
        if (comments_elements.length > 3) {
            const oldComment = comments_elements[0];
            oldComment.style.transition = 'all 0.5s ease';
            oldComment.style.opacity = '0';
            oldComment.style.transform = 'translateY(-10px)';
            setTimeout(() => oldComment.remove(), 500);
        }
    }

    updateLuckyCharms() {
        const luckyCharmsEl = document.getElementById('lucky-charms');
        if (!luckyCharmsEl) return;

        luckyCharmsEl.innerHTML = '';

        const charms = [
            { icon: '🍀', name: 'Lucky Clover', active: this.inventory['clover'] > 0 },
            { icon: '🐰', name: 'Rabbit Foot', active: this.inventory['rabbit-foot'] > 0 },
            { icon: '🧿', name: 'Evil Eye', active: this.inventory['evil-eye'] > 0 },
            { icon: '🔮', name: 'Fortune', active: this.inventory['fortune'] > 0 }
        ];

        charms.forEach(charm => {
            if (charm.active) {
                const charmEl = document.createElement('div');
                charmEl.className = 'charm-item active';
                charmEl.innerHTML = `
                    <span class="charm-icon">${charm.icon}</span>
                    <span class="charm-name">${charm.name}</span>
                `;
                luckyCharmsEl.appendChild(charmEl);
            }
        });

        // If no charms, show a placeholder
        if (luckyCharmsEl.children.length === 0) {
            const placeholderEl = document.createElement('div');
            placeholderEl.className = 'charm-item';
            placeholderEl.innerHTML = `
                <span class="charm-icon">✨</span>
                <span class="charm-name">No Charms</span>
            `;
            luckyCharmsEl.appendChild(placeholderEl);
        }
    }

    // Add casino ambiance sound indicator
    addCasinoAmbiance() {
        if (document.querySelector('.casino-sounds')) return;

        const soundsEl = document.createElement('div');
        soundsEl.className = 'casino-sounds';
        soundsEl.innerHTML = '🎵 Casino Ambiance';
        document.body.appendChild(soundsEl);
    }

    // Add floating chips decoration
    addFloatingChips() {
        if (document.querySelector('.floating-chips')) return;

        const chipsEl = document.createElement('div');
        chipsEl.className = 'floating-chips';
        chipsEl.innerHTML = '🪙💰🎰';
        document.querySelector('.game-container').appendChild(chipsEl);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new BlackjackGame(); // Make globally accessible for testing
});