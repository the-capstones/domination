# DOMINATION

An in-browser recreation of the classic board game Risk with multiplayer (player v player) and single player (player v AI) capabilities.

Created with React, Redux, and Firebase.


## RULES

Each turn has 3 phases:
1. Allotment: Place units on your territories.
2. Attack: Attempt to takeover an enemy territory.
3. Fortify: move units from your territory to another.

### Allotment
At the beginning of each turn, you are awarded new armies you’ll add to your territories based on the number of territories you occupy. Click on one of your territories to add an army to it.

### Attacking
After placing your armies, decide if you wish to attack at this time. The object of an attack is to capture a territory by defeating all the opposing armies already on it. The battle is fought by a roll of the dice. If you choose to attack, you must follow these rules:

* You may only attack a territory that’s adjacent (touching) to one of your own.
* You must always have at least two armies in the territory you’re attacking from.
* You may continue attacking one territory until you have eliminated all armies on it, or you may shift your attack from one territory to another, attacking each as often as you like and attacking as many territories as you like during one turn.
* You may end your attack(s) at any time.

To attack, first click the territory you’re attacking from and then the one you’re attacking. Click the roll button to attack. You, the attacker, will roll 3 dice; the defender will (automatically) roll 2 dice. The battle is decided by comparing the highest die each of you rolled. If yours (the attacker’s) is higher, the defender loses one army from the territory under attack. But if the defender’s die is higher than yours, you lose one army from the territory you attacked from.

#### Capturing a territory
As soon as you defeat the last opposing army on a territory, you capture that territory and occupy it immediately with all but one of the armies from the attacking territory. During the game, every territory must always be occupied by at least one army.

### Fortifying
No matter what you’ve done on your turn, you may, if you wish, end your turn by fortifying your position. You are not required to win a battle or even to try an attack to do so. To fortify your position, click on one of your territories that you'd like to move an army from. Then, click on an adjacent space to move an army to that territory. You may move as many armies as you’d like from one (and only one) of your territories into one (and only one) of your adjacent territories. In moving your armies from one territory to another, you must leave at least one army behind.

### Winning
The winner is the first player to eliminate every opponent by capturing all the territories on the board.


## TECHNICAL CHALLENGES

Interesting problems we came up against:
*
*
*
