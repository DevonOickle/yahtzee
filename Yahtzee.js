document.addEventListener('DOMContentLoaded', function() {


    const rollButton = document.getElementById('roll-button');
    const holdOnesButton = document.getElementById('holdOnes'); 
    const holdTwosButton = document.getElementById('holdtwos');
    const holdThreesButton = document.getElementById('holdThrees');
    const holdFoursButton = document.getElementById('holdFours');
    const holdFivesButton = document.getElementById('holdFives');
    const holdSixesButton = document.getElementById('holdSixes');
    const holdThreeOfKindButton = document.getElementById('holdThreeOfKind');
    const holdFourOfKindButton = document.getElementById('holdFourOfKind');
    const holdFullHouse = document.getElementById('holdFH');
    const holdSmallStraight = document.getElementById('holdSmallStraight');
    const holdLargeStraight = document.getElementById('holdLargeStraight');
    const holdChance = document.getElementById('holdChance');
    const holdYahtzee = document.getElementById('holdYahtzee');
    
    const diceNumber = [];
    const dice = [
        document.getElementById('die0'),
        document.getElementById('die1'),
        document.getElementById('die2'),
        document.getElementById('die3'),
        document.getElementById('die4')
    ];
    const numberCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };
    
    const score = [0, 0, 0, 0, 0, 0];
    const lowerScore = [0, 0, 0, 0, 0, 0, 0];
    const consecutiveNumbers = [0, 0, 0, 0, 0, 0];
    numOfNum = [0,0,0,0,0,0,]
    
    let upperSum = 0;
    
    let totalScore = 0;
    
    let threeOfKindScore = 0;
    let fourOfKindScore = 0;
    let fullHouseScore = 0;
    let smallStraightScore = 0;
    let largeStraightScore = 0;
    let yahtzeeScore = 0;
    
    
    
    let rollCount = 0; 
    let roundCount = 0;
    let largeStraightPossible = false;
    let smallStraightPossible = false;
    let onesHeld = false;
    let twosHeld = false;
    let threesHeld = false;
    let foursHeld = false;
    let fivesHeld = false;
    let sixesHeld = false;
    let threeOfKindHeld = false;
    let fourOfKindHeld = false;
    let fullHouseHeld = false;
    let smallStraightHeld = false;
    let largeStraightHeld = false;
    let chanceHeld = false;
    let yahtzeeHeld = false;
    let bonus = false;
    
    
    rollButton.addEventListener('click', onRollButtonClick);
    holdOnesButton.addEventListener('click', toggleHoldOnes);
    holdTwosButton.addEventListener('click', toggleHoldTwos);
    holdThreesButton.addEventListener('click', toggleHoldThrees);
    holdFoursButton.addEventListener('click', toggleHoldFours);
    holdFivesButton.addEventListener('click', toggleHoldFives);
    holdSixesButton.addEventListener('click', toggleHoldSixes);
    holdThreeOfKindButton.addEventListener('click', toggleHoldThreeOfKind);
    holdFourOfKindButton.addEventListener('click', toggleHoldFourOfKind);
    holdFullHouse.addEventListener('click', toggleHoldFullHouse);
    holdSmallStraight.addEventListener('click', toggleHoldSmallStraight);
    holdLargeStraight.addEventListener('click', toggleHoldLargeStraight);
    holdChance.addEventListener('click', toggleHoldChance);
    holdYahtzee.addEventListener('click', toggleHoldYahtzee);
    
    
    
    for (let i = 0; i < dice.length; i++) {
        diceNumber[i] = null;
        dice[i].addEventListener('click', function() {
            toggleHoldState(dice[i], i);
        });
    }
    
    function toggleHoldState(die, index) {
        if (!die.classList.contains('held')) {
            die.classList.add('held');
        } else {
            die.classList.remove('held');
        }
    }

    function clearHeldDice() {
        for (let i = 0; i < dice.length; i++) {
            dice[i].classList.remove('held');
        }
    }
    
    function onRollButtonClick() {
        if (rollCount < 3) {
            rollButton.disabled = true;
    
            for (let i = 0; i < dice.length; i++) {
                if (!dice[i].classList.contains('held')) {
                    rollDie(dice[i], i);
                }
            }
    
            setTimeout(stopAnimation, 1000);
            rollCount++;
    
            if (rollCount === 3) {
                rollButton.disabled = true;
            }
        }
    }
    
    function rollDie(die, index) {
        if (!die.classList.contains('held')) {
            die.style.animation = 'roll 1s steps(6) infinite';
        }
    }
    
    function stopAnimation() {
        document.getElementById("pip").innerHTML = " ";
    
        let isYahtzee = true;
    
        const counts = {};
    
        for (let i = 0; i < dice.length; i++) {
            if (!dice[i].classList.contains('held')) {
                const randomNumber = Math.floor(Math.random() * 6) + 1;
                dice[i].style.animation = 'none';
                dice[i].style.backgroundPosition = -100 * (randomNumber - 1) + '% 0';
    
                diceNumber[i] = randomNumber;
                counts[randomNumber] = (counts[randomNumber] || 0) + 1;
            }
        }
    
        for (let i = 0; i < dice.length; i++) {
            if (dice[i].classList.contains('held')) {
                diceNumber[i] = diceNumber[i] || Math.floor(Math.random() * 6) + 1;
            }
    
            document.getElementById("pip").innerHTML += diceNumber[i] + " ";
        }
    
        rollButton.disabled = rollCount === 3 ? true : false;
    
        const total = sumArray(diceNumber);
        
        document.getElementById("totalupper").innerHTML = upperSum;
    
        if (upperSum >= 63) {
            bonus = true;
            document.getElementById("bonus").innerHTML = 35;
            totalScore += 35;
            bonus = false;
        }

        countDiceNumbers();
        
    }
    
    function sumArray(array) {
        return array.reduce(function(previousValue, currentValue) {
            return previousValue + currentValue;
        }, 0);
        
    }
   
    function countDiceNumbers() {
        const numOfPips = [0, 0, 0, 0, 0, 0];
    
        let twoOfKind = false;
        let threeOfKind = false;
    
        for (let i = 0; i < diceNumber.length; i++) {
            const number = diceNumber[i];
            if (number >= 1 && number <= 6) {
                numOfPips[number - 1]++;
            }
        }
    
        let hasThreeOfAKind = false;
        let hasFourOfAKind = false;
        let hasTwoOfAKind = false;
        let twoOfKindNum = 0;
        let threeOfKindNum = 0;
    
        for (let i = 0; i < numOfPips.length; i++) {
            if (numOfPips[i] >= 3) {
                hasThreeOfAKind = true;
                document.getElementById("possibleThreeOfKind").textContent = (i + 1) * 3;
                threeOfKindScore = (i + 1) * 3;
                threeOfKindNum = i;
            } 
            
            if (numOfPips[i] >= 4) {
                hasFourOfAKind = true;
                document.getElementById("possibleFourOfKind").textContent = (i + 1) * 4;
                fourOfKindScore = (i + 1) * 4;
            } 
            
            
        }
    
        for (let j = 0; j < numOfPips.length; j++) {
            if (numOfPips[j] >= 2) {
                if (j !== threeOfKindNum) {
                    hasTwoOfAKind = true;
                    twoOfKindNum = j;
                }
            }
        }
    
        if (hasThreeOfAKind && hasTwoOfAKind) {
            document.getElementById("possibleFullHouse").textContent = "25";
            fullHouseScore = 25;
        } else {
            document.getElementById("possibleFullHouse").textContent = "-";
        }

        function isSmallStraight(diceNumbers) {
            const uniqueNumbers = Array.from(new Set(diceNumbers));
            if (uniqueNumbers.length < 4) {
                return false;
            }
            uniqueNumbers.sort();
            for (let i = 0; i < uniqueNumbers.length - 1; i++) {
                if (uniqueNumbers[i + 1] - uniqueNumbers[i] > 1) {
                    return false;
                }
            }
            smallStraightScore = 30;
            return true;
        }
        
        
        function isLargeStraight(diceNumbers) {
            const uniqueNumbers = Array.from(new Set(diceNumbers));
            if (uniqueNumbers.length < 5) {
                return false;
            }
            uniqueNumbers.sort();
            for (let i = 0; i < uniqueNumbers.length - 1; i++) {
                if (uniqueNumbers[i + 1] - uniqueNumbers[i] !== 1) {
                    return false;
                }
            }
            largeStraightScore=40;
            return true;
        }

        if (isSmallStraight(diceNumber)) {
            document.getElementById("possibleSmallStraight").textContent = "30";
        } else {
            document.getElementById("possibleSmallStraight").textContent = "-";
        }
        
        if (isLargeStraight(diceNumber)) {
            document.getElementById("possibleLargeStraight").textContent = "40";
        } else {
            document.getElementById("possibleLargeStraight").textContent = "-";
        }
 
    
        document.getElementById("possibleOnesScore").textContent = numOfPips[0];
        document.getElementById("possibleTwosScore").textContent = numOfPips[1] * 2;
        document.getElementById("possibleThreesScore").textContent = numOfPips[2] * 3;
        document.getElementById("possibleFoursScore").textContent = numOfPips[3] * 4;
        document.getElementById("possibleFivesScore").textContent = numOfPips[4] * 5;
        document.getElementById("possibleSixesScore").textContent = numOfPips[5] * 6;
        document.getElementById("possibleChance").innerHTML = sumArray(diceNumber);
        



        let hasYahtzee = false;
        for (let i = 0; i < numOfPips.length; i++) {
            if (numOfPips[i] >= 5) {
                hasYahtzee = true;
                document.getElementById("possibleYahtzee").textContent = "50";
                yahtzeeScore = 50;
            }
        }

        if(roundCount == 13){
            rollButton.disabled = true
            document.getElementById('Sum').textContent = totalScore;

        }
    
        for (let i = 0; i < numOfNum.length; i++) {
            numOfNum[i] = numOfPips[i] * (i + 1);
        }
        lowerScore[5] = sumArray(diceNumber);

        document.getElementById("totalScore").innerHTML = totalScore;
    }
    
    function toggleHoldOnes() {
        if (!onesHeld) {
            onesHeld = true;
            rollButton.disabled = false;
            rollCount = 0;
            clearHeldDice()
        }
        if (onesHeld) {
            onesHeld = true;
            document.getElementById("oneScore").textContent = numOfNum[0];
            document.getElementById("holdOnes").disabled = true; 
            Object.defineProperty(score, 0, {
                value: numOfNum[0],
                writable: false,
            });
            document.getElementById("oneScore").textContent = score[0];
            document.getElementById("holdOnes").disabled = true;
            document.getElementById("possibleOnesScore").textContent = "-"
            
            upperSum += numOfNum[0];
            totalScore += numOfNum[0];
            roundCount +=1;
            rollCount = 0;
            onesHeld = false;

            if(roundCount == 13){
                rollButton.disabled = true
                document.getElementById('Sum').textContent = totalScore;
            }
            document.getElementById('totalScore').textContent = totalScore;

        }
    }
    
    function toggleHoldTwos() {
        if (!twosHeld) {
            twosHeld = true;
            rollButton.disabled = false;
            rollCount = 0;
            clearHeldDice()
        }
        if (twosHeld) {
            twosHeld = true;
            document.getElementById("twoScore").textContent = numOfNum[1];
            document.getElementById("holdtwos").disabled = true; 
            Object.defineProperty(score, 1, {
                value: numOfNum[1],
                writable: false,
            });
            document.getElementById("twoScore").textContent = score[1];
            document.getElementById("holdtwos").disabled = true;
            document.getElementById("possibleTwosScore").textContent = "-"
            twosHeld = false;
    
            upperSum += numOfNum[1];
            totalScore += numOfNum[1];
            roundCount +=1;
            rollCount = 0;
            if(roundCount == 13){
                rollButton.disabled = true
                document.getElementById('Sum').textContent = totalScore;
    
            }
            document.getElementById('totalScore').textContent = totalScore;

        }
    }
    
    function toggleHoldThrees() {
        if (!threesHeld) {
            threesHeld = true;
            rollButton.disabled = false;
            rollCount = 0;
            clearHeldDice()
        }
        if (threesHeld) {
            threesHeld = true;
            document.getElementById("threeScore").textContent = numOfNum[2];
            document.getElementById("holdThrees").disabled = true; 
            Object.defineProperty(score, 2, {
                value: numOfNum[2],
                writable: false,
            });
            document.getElementById("threeScore").textContent = score[2];
            document.getElementById("holdThrees").disabled = true;
            document.getElementById("possibleThreesScore").textContent = "-"
            threesHeld = false;
    
            upperSum += numOfNum[2];
            totalScore += numOfNum[2];
            roundCount +=1;
            rollCount = 0;
            if(roundCount == 13){
                rollButton.disabled = true
                document.getElementById('Sum').textContent = totalScore;
    
            }
            document.getElementById('totalScore').textContent = totalScore;

        } 
    }
    
    function toggleHoldFours() {
        if (!foursHeld) {
            foursHeld = true;
            rollButton.disabled = false;
            rollCount = 0;
            clearHeldDice()
        }
        if (foursHeld) {
            foursHeld = true;
            document.getElementById("fourScore").textContent = numOfNum[3];
            document.getElementById("holdFours").disabled = true; 
            Object.defineProperty(score, 3, {
                value: numOfNum[3],
                writable: false,
            });
            document.getElementById("fourScore").textContent = score[3];
            document.getElementById("holdFours").disabled = true;
            document.getElementById("possibleFoursScore").textContent = "-"
            foursHeld = false;
    
            upperSum += numOfNum[3];
            totalScore += numOfNum[3];
            roundCount +=1;
            if(roundCount == 13){
                rollButton.disabled = true
                document.getElementById('Sum').textContent = totalScore;
    
            }
            document.getElementById('totalScore').textContent = totalScore;

        }  
    }
    
    function toggleHoldFives() {
        if (!fivesHeld) {
            fivesHeld = true;
            rollButton.disabled = false;
            rollCount = 0;
            clearHeldDice()
        }
        if (fivesHeld) {
            fivesHeld = true;
            document.getElementById("fiveScore").textContent = numOfNum[4];
            document.getElementById("holdFives").disabled = true; 
            Object.defineProperty(score, 4, {
                value: numOfNum[4],
                writable: false,
            });
            document.getElementById("fiveScore").textContent = score[4];
            document.getElementById("holdFives").disabled = true;
            document.getElementById("possibleFivesScore").textContent = "-"
            fivesHeld = false;
    
            upperSum += numOfNum[4];
            totalScore += numOfNum[4];
            roundCount +=1;
            if(roundCount == 13){
                rollButton.disabled = true
                document.getElementById('Sum').textContent = totalScore;
    
            }
            document.getElementById('totalScore').textContent = totalScore;

        }  
    }
    
    function toggleHoldSixes() {
        if (!sixesHeld) {
            sixesHeld = true;
            rollButton.disabled = false;
            rollCount = 0;
            clearHeldDice()
        }
        if (sixesHeld) {
            sixesHeld = true;
            document.getElementById("sixScore").textContent = numOfNum[5];
            document.getElementById("holdSixes").disabled = true; 
            Object.defineProperty(score, 5, {
                value: numOfNum[5],
                writable: false,
            });
            document.getElementById("sixScore").textContent = score[5];
            document.getElementById("holdSixes").disabled = true;
            document.getElementById("possibleSixesScore").textContent = "-"
            sixesHeld = false;
    
            upperSum += numOfNum[5];
            totalScore += numOfNum[5];
            roundCount +=1;
            if(roundCount == 13){
                rollButton.disabled = true
                document.getElementById('Sum').textContent = totalScore;
    
            }
            document.getElementById('totalScore').textContent = totalScore;

        }   
    }
    
    function toggleHoldThreeOfKind() {
        if (!threeOfKindHeld) {
            threeOfKindHeld = true;
            rollButton.disabled = false;
            rollCount = 0;
            clearHeldDice()
        }
    
        if (threeOfKindHeld) {
            threeOfKindHeld = true;
    
            document.getElementById("threeOfKind").textContent = threeOfKindScore;
            document.getElementById("holdThreeOfKind").disabled = true; 
            Object.defineProperty(lowerScore, 0, {
                value: threeOfKindScore,
                writable: false,
            });
            document.getElementById("threeOfKind").textContent = lowerScore[0];
            document.getElementById("holdThreeOfKind").disabled = true;
            document.getElementById("possibleThreeOfKind").textContent = "-"
    
            totalScore += lowerScore[0];
            threeOfKindHeld = false;
            roundCount +=1;
            if(roundCount == 13){
                rollButton.disabled = true
                document.getElementById('Sum').textContent = totalScore;
    
            }
            document.getElementById('totalScore').textContent = totalScore;

        }
    }
    
    function toggleHoldFourOfKind(){
        if (!fourOfKindHeld) {
            fourOfKindHeld = true;
            rollButton.disabled = false;
            rollCount = 0;
            clearHeldDice()
        }
    
        if (fourOfKindHeld) {
            fourOfKindHeld = true;
    
            document.getElementById("fourOfKind").textContent = fourOfKindScore;
            document.getElementById("holdFourOfKind").disabled = true; 
            Object.defineProperty(lowerScore, 1, {
                value: fourOfKindScore,
                writable: false,
            });
            document.getElementById("fourOfKind").textContent = lowerScore[1];
            document.getElementById("holdFourOfKind").disabled = true;
            document.getElementById("possibleFourOfKind").textContent = "-"
    
            totalScore += lowerScore[1];
            fourOfKindHeld = false;
            roundCount +=1;
            if(roundCount == 13){
                rollButton.disabled = true
                document.getElementById('Sum').textContent = totalScore;
    
            }
            document.getElementById('totalScore').textContent = totalScore;

        }
    
    }
    
    function toggleHoldFullHouse(){
        if (!fullHouseHeld) {
            fullHouseHeld = true;
            rollButton.disabled = false;
            rollCount = 0;
            clearHeldDice()
        }
    
        if (fullHouseHeld) {
            fullHouseHeld = true;
    
            document.getElementById("fullHouse").textContent = fullHouseScore;
            document.getElementById("holdFH").disabled = true; 
            Object.defineProperty(lowerScore, 2, {
                value: fullHouseScore,
                writable: false,
            });
            document.getElementById("fullHouse").textContent = lowerScore[2];
            document.getElementById("holdFH").disabled = true;
            document.getElementById("possibleFullHouse").textContent = "-"
    
            totalScore += lowerScore[2];
            fullHouseHeld = false;
            roundCount +=1;
            if(roundCount == 13){
                rollButton.disabled = true
                document.getElementById('Sum').textContent = totalScore;
    
            }
            document.getElementById('totalScore').textContent = totalScore;

        }
    }
    
    function toggleHoldSmallStraight() {
        if (!smallStraightHeld) {
            smallStraightHeld = true;
            rollButton.disabled = false;
            rollCount = 0;
            clearHeldDice();
        }
    
        if (smallStraightHeld) {
            smallStraightHeld = true;
            document.getElementById("smallStraight").textContent = smallStraightScore;
            document.getElementById("holdSmallStraight").disabled = true;
            Object.defineProperty(lowerScore, 3, {
                value: smallStraightScore, 
                writable: false,
            });
            document.getElementById("possibleSmallStraight").textContent = "-";  
            smallStraightHeld = false;
            roundCount += 1;
            if (isSmallStraight(diceNumber)){
                totalScore += 30;
            }
            if(roundCount == 13){
                rollButton.disabled = true
                document.getElementById('Sum').textContent = totalScore;
    
            }
            document.getElementById('totalScore').textContent = totalScore;

        }
    }
    
    
    function toggleHoldLargeStraight() {
        if (!largeStraightHeld) {
            largeStraightHeld = true;
            rollButton.disabled = false;
            rollCount = 0;
            clearHeldDice();
        }
    
        if (largeStraightHeld) {
            largeStraightHeld = true;
            document.getElementById("largeStraight").textContent = largeStraightScore; 
            document.getElementById("holdLargeStraight").disabled = true;
            Object.defineProperty(lowerScore, 4, {
                value: largeStraightScore, 
                writable: false,
            });
            document.getElementById("possibleLargeStraight").textContent = "-"; 
            largeStraightHeld = false;
            roundCount += 1;

            if (isLargeStraight(diceNumber)){
                totalScore += 40;
            }
            if(roundCount == 13){
                rollButton.disabled = true
                document.getElementById('Sum').textContent = totalScore;
    
            }
            document.getElementById('totalScore').textContent = totalScore;

        }
    }
    
    function toggleHoldChance(){
        if (!chanceHeld) {
            chanceHeld = true;
            rollButton.disabled = false;
            rollCount = 0;
            clearHeldDice()
        }
        if (chanceHeld) {
            chanceHeld = true;
            document.getElementById("chance").textContent = sumArray(diceNumber);
            document.getElementById("holdChance").disabled = true; 
            Object.defineProperty(lowerScore, 5, {
                value: sumArray(diceNumber),
                writable: false,
            });
            document.getElementById("chance").textContent = lowerScore[5];
            document.getElementById("holdChance").disabled = true;
            document.getElementById("possibleChance").textContent = "-"
            
            
            totalScore += lowerScore[5];
            chanceHeld = false;
            roundCount +=1;
            if(roundCount == 13){
                rollButton.disabled = true
                document.getElementById('Sum').textContent = totalScore;
    
            }
            document.getElementById('totalScore').textContent = totalScore;

        }
    
    } 
    
    function toggleHoldYahtzee(){
        if (!yahtzeeHeld) {
            yahtzeeHeld = true;
            rollButton.disabled = false;
            rollCount = 0;
            clearHeldDice()
        }
    
        if (yahtzeeHeld) {
            yahtzeeHeld = true;
            document.getElementById("yahtzee").textContent = yahtzeeScore;
            document.getElementById("holdYahtzee").disabled = true; 
            Object.defineProperty(lowerScore, 6, {
                value: yahtzeeScore,
                writable: false,
            });
            document.getElementById("yahtzee").textContent = lowerScore[6];
            document.getElementById("holdYahtzee").disabled = true;
            document.getElementById("possibleYahtzee").textContent = "-"
            
            
            totalScore += lowerScore[6];
            yahtzeeHeld = false;
            roundCount +=1;
            if(roundCount == 13){
                rollButton.disabled = true
                document.getElementById('Sum').textContent = totalScore;
    
            }
            document.getElementById('totalScore').textContent = totalScore;

        }
    
    }
    
    });