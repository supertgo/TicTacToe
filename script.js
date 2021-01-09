const DOM = (() => {

    const container = document.querySelector('#container'),
        gameButtonsEl = document.querySelectorAll('.gameButtons'),
        choiceButtonsEl = document.querySelector('#choiceBtns'),
        divPlayers = document.querySelector('#players'),
        mainEl = document.querySelector('main'),
        h1El = document.querySelector('h1'),
        h2El = document.querySelector('h2'),
        formEl  = document.querySelector('form'),
        popUp = document.querySelector('#popUp'),
        btnSubmitEl = document.querySelector('#submit'),
         player1Name = document.querySelector('#popUpP1'),
         player2Name = document.querySelector('#popUpP2'),
        scrName1 = document.querySelector('#scoreNameP1'),
        scrName2 = document.querySelector('#scoreNameP2'),
        restartBtnEl = document.querySelector('#restartBtn'),
        imgRestarBtnEL = document.querySelector('#imgRestart'),
        scoreP1El = document.querySelector('#scoreP1'),
        scoreP2El = document.querySelector('#scoreP2'),
        winnerEl = document.querySelector('#winner'),
        sectionEl = document.querySelector('section'),
        divRoundEnd = document.querySelector('#winnerCard'),
        reloadBtn = document.querySelector('#reloadBtn'),
        imgWinnerEl = document.querySelector('#imgTrophy');


        

    const game = (h1, h2) => {

        h1.style.fontSize = '3em';
        h2.style.display = 'none';
    }

    return {
        container, gameButtonsEl, choiceButtonsEl,
         game, h1El, h2El, mainEl, divPlayers, 
         formEl, btnSubmitEl,popUp, player1Name, 
         player2Name, scrName1, scrName2, 
         restartBtnEl, scoreP1El, scoreP2El, 
         winnerEl,sectionEl, divRoundEnd, imgWinnerEl, reloadBtn
    }
        
})();

const player = (name, mark, id) => {

    return {name, mark, id};

};

const gameBoard = (() => {

    let gameButtonsEl = DOM.gameButtonsEl;
    let restartBtn = DOM.restartBtnEl;
    let p1Times = p2Times = 0;
    let scorep1 = scorep2 = 0;
    
    let scoreHuman = scoreAi = 0;

    let AiPlayer;
    let AiPlayerMark;
    
    let HumanPlayer;
    let HumanPlayerMark;

    const _emptyBtn = (btnValue) => {

       if (btnValue !== ' ') return false;

       else return true;
    }
    
    const markPlayers = (btn, p1, p2) => {
        
        let result;

        if (_emptyBtn(btn.value) === false) return; //adicionar uma transição ou algo que pisque o botão

        else {

            if (p1Times <= p2Times){
                btn.value = p1.mark;
                p1Times++;
            }

            else{
                btn.value = p2.mark;
                p2Times++;
            }
            
        }

        result = _winner(gameButtonsEl);

        if(result !== null && result !== 'Its a Tie'){

            if(p1.mark === result){
                scorep1++;
                DOM.winnerEl.innerText = 'Player ' + p1.name + ' ' + 'Won!';
                DOM.winnerEl.innerText += '\n Click to play one more Time'
                DOM.scoreP1El.innerText = 'Score: ' + scorep1;
                DOM.scoreP2El.innerText = 'Score: ' + scorep2;
            }
                

            else{
                scorep2++;
                DOM.scoreP1El.innerText = 'Score: ' + scorep1;
                DOM.scoreP2El.innerText = 'Score: ' + scorep2;
                DOM.winnerEl.innerText = 'Player ' + p2.name + ' ' + 'Won!';
                DOM.winnerEl.innerText += '\n Click to play one more Time'

            }
            
            DOM.sectionEl.style.display = 'flex';

            
            _clearButttons();
        }

        if(result === 'Its a Tie'){
            DOM.sectionEl.style.display = 'flex';

            DOM.winnerEl.innerText = 'We have a tie!!!';

            DOM.winnerEl.innerText += '\n Click to play one more Time';
            
            DOM.scoreP1El.innerText = 'Score: ' + scorep1;
            DOM.scoreP2El.innerText = 'Score: ' + scorep2;

            _clearButttons();
            DOM.imgWinnerEl.style.display = 'none';
        }

    }
    //AI
    const markAi = (btn, p1) => {
        
        if (_emptyBtn(btn.value) === false) return false;

        else{
            btn.value = p1.mark;
            return true;
        }
    };


    //............................................................................
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
        
    };

    const _winnerByRows = (array)  => {
        
        for(let i = 0; i < 7; i += 3){
            
            if (array[i].value === array[i + 1].value 
                && array[i].value === array[i + 2].value && array[i].value !== ' ')
                return array[i].value;
        }

        return undefined;

    };

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
    
    };
    
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

    function _checkWinnerWithAi () {

        

        result = _winner(gameButtonsEl);

        if(result !== null && result !== 'Its a Tie'){

            if(HumanPlayerMark === result){

                scoreHuman++;
                DOM.winnerEl.innerText = 'Human Won!';
                DOM.winnerEl.innerText += '\n Click to play one more Time'
                DOM.scoreP1El.innerText = 'Score: ' + scoreHuman;
                DOM.scoreP2El.innerText = 'Score: ' + scoreAi;
            }
                

            else{

                scoreAi++;
                DOM.scoreP1El.innerText = 'Score: ' + scoreHuman;
                DOM.scoreP2El.innerText = 'Score: ' + scoreAi;
                DOM.winnerEl.innerText = 'Artificial Intelligence Won!';
                DOM.winnerEl.innerText += '\n Click to play one more Time'

            }
            
            DOM.sectionEl.style.display = 'flex';

            
            _clearButttons();
        }

        if(result === 'Its a Tie'){
            DOM.sectionEl.style.display = 'flex';

            DOM.winnerEl.innerText = 'We have a tie!!!';

            DOM.winnerEl.innerText += '\n Click to play one more Time';
            
            DOM.scoreP1El.innerText = 'Score: ' + scoreHuman;
            DOM.scoreP2El.innerText = 'Score: ' + scoreAi;

            _clearButttons();
            DOM.imgWinnerEl.style.display = 'none';
        }

    }
    
    const startGame = (p1, p2) => {

        _clearButttons();
        
        if(p2.name !== 'AI BOT')
            gameButtonsEl.forEach(btn => btn.addEventListener('click', () => markPlayers(btn, p1, p2)));
        
        else{
            let retorno;
            HumanPlayer = p1;
            HumanPlayerMark = p1.mark;

            AiPlayer = p2;
            AiPlayerMark = p2.mark;

            
                gameButtonsEl.forEach(btn => btn.addEventListener('click', () => {


                    //markAi(btn, p1);
                    
                    if(markAi(btn, p1))
                    {
                        retorno = _minimax(gameButtonsEl, AiPlayer);
                        gameButtonsEl[retorno.id].value = AiPlayerMark;
                    }

                    setTimeout(function(){ _checkWinnerWithAi()}, 2000); 


                }));
        }

    };

    const _clearButttons = function() { 

        gameButtonsEl.forEach(e => e.value = ' ');

        p1Times = p2Times = 0;

    };

    function twoPlayersGame () {

        let p1Name = DOM.player1Name.value;
        let p2Name = DOM.player2Name.value;

        if(p1Name === '')
            p1Name = 'player1';
        
        if(p2Name === '')
            p2Name = 'player2';

        const player1 = player(p1Name, 'X', 'player1');
        const player2 = player(p2Name, 'O', 'player2');

        

        DOM.scrName1.innerText +=' ' + p1Name;
        DOM.scrName2.innerText +=' ' + p2Name;

        startGame(player1, player2);
    }

    const oponent = () => {

        let playersButton = document.querySelector('#pp');
        let divGame = DOM.choiceButtonsEl;
        let pcButton = document.querySelector('#ai');
        let container = DOM.container;
        let divPlayers = DOM.divPlayers;
        let form = DOM.formEl;
        let submit = DOM.btnSubmitEl;
        let popUp = DOM.popUp;


        playersButton.addEventListener('click', () => {
           //startGame
           
            DOM.game(DOM.h1El, DOM.h2El);

            DOM.reloadBtn.style.display = 'inline';
            popUp.style.display = 'inline';
            divGame.style.display = 'none';
            

            submit.addEventListener('click', () => {

                
                divPlayers.style.display = 'inline';
                container.style.display = 'grid';
                popUp.style.display = 'none';
                restartBtn.style.display = 'inline';
                twoPlayersGame();
                
            });          
        });

        pcButton.addEventListener('click', () => {
            //startGame

            DOM.game(DOM.h1El, DOM.h2El);


            DOM.reloadBtn.style.display = 'inline';
            divPlayers.style.display = 'inline';
            divGame.style.display = 'none';
            container.style.display = 'grid';

            restartBtn.style.display = 'inline';
            DOM.scrName1.innerText += ' Human';
            DOM.scrName2.innerText += ' Ai Bot';
            const player1 = player('player', 'X', 'player1');
            const AI = player('AI BOT', 'O', 'player2');
            
            startGame(player1, AI);
        });
    }

    function _closeSection() {

        if(DOM.sectionEl.style.display === 'flex')
            DOM.sectionEl.style.display = 'none';
    }


    function _getEmptyIndex (array) {
        
        let empty = [];

        for (let i = 0; i < array.length; i++)
        {
            if (array[i].value === ' ')
                empty.push(i);
        }

        return empty;
    }

    function _minimax (array, player) {

        if(_winner(array) === 'Its a Tie') return { evaluation : 0};

        if(_winner(array) === HumanPlayerMark) return {evaluation : -10};

        if(_winner(array) === AiPlayerMark)return { evaluation : +10};
        
        let empty = _getEmptyIndex(array);

        let moves = [];

        for(let i = 0; i < empty.length; i++){

            let id = empty[i];

            let savedSpace = array[id].value;

            array[id].value = player.mark;

            let move = {};
            move.id = id;

            if(player.mark === AiPlayerMark){
                move.evaluation = _minimax(array, HumanPlayer).evaluation;
            }

            else{
                move.evaluation = _minimax(array, AiPlayer).evaluation;
            }

            array[id].value = savedSpace;

            moves.push(move);
        }

        let bestMove;

        if(player === AiPlayer){
            let bestValue = -Infinity;

            for(let i = 0; i < moves.length; i++){

                if(moves[i].evaluation > bestValue){
                    bestValue = moves[i].evaluation;
                    bestMove = moves[i];
                }
                
            }

        }

        else {
            let bestValue = +Infinity;

            for(let i = 0; i < moves.length; i++){
                if(moves[i].evaluation < bestValue){
                    bestValue = moves[i].evaluation;
                    bestMove = moves[i];
                }
                    
            }
        }
    
        return bestMove;
    }

    restartBtn.addEventListener('click', () => {
        _clearButttons();
        if(DOM.sectionEl.style.display === 'flex')
        DOM.sectionEl.style.display = 'none';
    });
    DOM.sectionEl.addEventListener('click', _closeSection);
    DOM.reloadBtn.addEventListener('click', () => location.reload());
    
    //remove the user to click more than once on the buttons
    
    return {
        oponent
    }

})();

gameBoard.oponent();
