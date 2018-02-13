$(document).ready(function () {
    //create array to contain sentences
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];

    let sentenceIndex = 0;
    let letterIndex = 0;
    let currentLetterDiv = $('#target-letter');
   

    let currentSentence = sentences[0]; //starts with current sentence = first sentence
    let currentLetter = currentSentence[0]; // sets current letter at start
    let start; // for timer
    let finish; // for timer
    let errors = 0; // track errors

    $('#sentence').append(currentSentence); //set sentence div to current sentence
    $('#target-letter').append(currentLetter); // set letter div to current letter


    //Hide uppercase keyboard on page load
    $('#keyboard-upper-container').hide();

    //Display uppercase keyboard on shift key press
    $(document).keydown(function (event) {
        let keyDown = event.which;
        if (keyDown === 16) { 
            $('#keyboard-upper-container').show();
            $('#keyboard-lower-container').hide();
        }
    });

    //Hide uppercase keyboard when shift key is pressed
    $(document).keyup(function (event) {
        let keyUp = event.which;
        if(keyUp === 16) {
            $('#keyboard-upper-container').hide();
            $('#keyboard-lower-container').show();
        }
        $('.highlight').removeClass('highlight');
    });
    
    //Highlight keys on press
    $(document).keypress(function(event) {
        let keyPress = event.which;
        $('#' + keyPress).addClass('highlight');
        let currentSentence = sentences[sentenceIndex];
        let currentLetter = currentSentence[letterIndex];

        if (start == undefined) { //Start timer once first key is pressed
            start = event.timeStamp;
        }

        $('#yellow-block').css("left", "+=17.5px"); //moves yellow block to the right

        letterIndex++; //advance to next letter
        let nextLetter = currentSentence[letterIndex]; //get next letter from current sentence at position [letterIndex]
        currentLetterDiv.text(nextLetter);


        //Begin code to provide feedback based on input while typing
        if (letterIndex < currentSentence.length -1) { //test letter position

            if (event.which === currentLetter.charCodeAt()) {
                $("#feedback").append("<span class = 'glyphicon glyphicon-ok'></span>"); //set ok icon
            } else {
                    $("#feedback").append("<span class = 'glyphicon glyphicon-remove'></span>"); //set incorrect icon
                    errors++; //add +1 to error count
            }
        }

        //Keep going until letterIndex = currentsentence.length
        // 
        ///
        ////
        //Begin code to reset variables upon sentence completion
        if (letterIndex == currentSentence.length) {
            $('#sentence').empty();
            sentenceIndex++; // + 1 sentence index
            currentSentence = sentences[sentenceIndex]; 
            $('#sentence').append(currentSentence); //add new sentence to div
            letterIndex = 0; //reset letter index

            if (sentenceIndex < sentences.length - 1) {
                let nextLetter = currentSentence[letterIndex];
            }
            currentLetterDiv.append(nextLetter);
            $('#yellow-block').css("left", ""); //reset block position
            $('#feedback').empty(); // clear feedback
        }

        //Begin code to calculate score and display results
        if (sentenceIndex > sentences.length - 1) {
            finish = event.timeStamp;//get final time
            let time = (finish - start); //calc time by subtracting start from final
            time /= 60000; 
            let speed = Math.round((54 / time) - (errors * 2));
            $('#target-letter').text('Your score is ' + speed + ' words per minute');
        
            //begin timout function to time asking if user wants to try again
            setTimeout(function () {
            let tryAgain = confirm('Do you want to try again?');
            if (tryAgain == true) {
                window.location.reload();//reload window
            } else {
                return;
            };
            }, 3000);
        }
        
    });//ending keypress function
});//ending document ready function