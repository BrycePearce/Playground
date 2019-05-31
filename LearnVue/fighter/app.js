new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack() {
            // player attack
            const damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        specialAttack() {
            const damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'Player special attacks for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        heal() {
            this.playerHealth <= 90 ? this.playerHealth += 10 : this.playerHealth = 100;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.monsterAttacks();
        },
        giveUp() {
            this.gameIsRunning = false;
        },
        monsterAttacks() {
            const damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
        },
        calculateDamage(minDmg, maxDmg) {
            return Math.max(Math.floor(Math.random() * maxDmg) + 1, minDmg);
        },
        checkWin() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost :{  New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});