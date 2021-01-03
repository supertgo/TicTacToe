const DOM = (() => {

    const container = document.querySelector('#container');
    
    const gameButtonsEl = document.querySelectorAll('.gameButtons');

    return {
        container, gameButtonsEl
    }
        
})();

const player = (name, mark, id) => {

    //choice função que escolhe x ou bola
    
    return {name, mark, id}
};


const gameBoard = (() => {

    const player1 = player('player1', 'X', 'player1');
    const player2 = player('player2', 'O', 'player2');

    let gameButtonsEl = DOM.gameButtonsEl;

    let p1Times = p2Times = 0;

    const _emptyBtn = (btnValue) => {

       if (btnValue !== ' ') return false;
       else return true;

    }
    
    const markPlayers = (btn) => {
        
        let result;

        if (_emptyBtn(btn.value) === false) return //adicionar uma transição ou algo que pisque o botão

        else {

            if (p1Times <= p2Times){
                btn.value = 'X';
                p1Times++;
            }

            else{
                btn.value = 'O';
                p2Times++;
            }
            
        }

        result = _winner(gameButtonsEl);

        if(result !== null && result !== 'Its a Tie'){
            if(player1.mark === result)
                alert('the winner is ' + player1.name);

            else
                alert('the winner is ' + player2.name)
        }

    }

    const markAi = (btn) => {
        _emptyBtn(btn.value) ? false : btn.value = 'X';
    }

    const _winner = (array) => {

        
        //Columns
         if(_winnerByColumns(array) !== undefined)
             return  _winnerByColumns(array);
        
        //Rows
        if(_winnerByRows(array) !== undefined)
            return _winnerByRows(array);

        if(_winnerByDiagonal(array) !== undefined)
            return _winnerByDiagonal(array);

        //retorna winner com mark
        if(_isItFull(array)) 
            return 'Its a Tie';

        else 
            return null;
        

    }

    const _winnerByRows = (array)  => {
        
        
        for(let i = 0; i < 7; i += 3){
            
            if (array[i].value === array[i + 1].value 
                && array[i].value === array[i + 2].value && array[i].value !== ' ')
                return array[i].value;
        }


        return undefined;
    }

    const _winnerByColumns = (array) => {
        for(let i = 0; i < 3; i++){

            if(array[i].value !== ' '){

                
                if(array[i].value === array[i + 3].value 
                    && array[i].value === array[i + 6].value 
                )
                {
                    return array[i].value;
                }

            }
        }

        return undefined;
        
    }
    
    const _winnerByDiagonal = (array) =>{

        let mid = array[4].value;

        if (array[0].value === mid && mid === array[array.length - 1].value
            && mid !== ' ')
            return mid;
        
        else if (array[2].value === mid && mid === array[6].value 
            && mid !== ' ')
            return mid;

        else
            return undefined;

    };

    function _isItFull (array) {

        for (let i = 0; i < array.length; i++){
            if (array[i].value === ' ' || array[i].value === '')
                return false;

        }

        return true;
            
    }
    
    const startGame = (p1, p2) => {

        _clearButttons();
        
        if(p2.name !== 'AI BOT')
            gameButtonsEl.forEach(btn => btn.addEventListener('click', () => markPlayers(btn)));
        
        else{
            gameButtonsEl.forEach(btn => btn.addEventListener('click', () => markAi(btn) 
            //call another function to make IA works
            ));
        }

    };

    const _clearButttons = function() { 

        gameButtonsEl.forEach(e => e.value = ' ');

    };


    const oponent = () => {
        let playersButton = document.querySelector('#pp');

        let pcButton = document.querySelector('#ai');


        playersButton.addEventListener('click', () => {
           //startGame
           


           startGame(player1, player2);

          
        });

        pcButton.addEventListener('click', () => {
            //startGame
            const player1 = player('player', 'X', 'player1');
            const AI = player('AI BOT', 'O', 'player2');

            startGame(player1, AI);
        });
    }

    //remove the user to click more than once on the buttons
   
    

    

    //Render, o game em si (matriz)

    return {
        oponent
    }
})();


gameBoard.oponent();
