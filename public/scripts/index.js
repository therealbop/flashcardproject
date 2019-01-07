// When the button is pressed 
// $(document).ready(function()
// {
    

//     })
   


$.ajax({
            type: 'GET',
            url: '/flashcards',
            success: function(card) {
                 console.log(card)
                
                    var i = Math.floor(Math.random() * card.length);
                    $("h3").html(card[i].question)
                    $("h4").html(card[i].answer)
            
                
            }
        })
        //     error: function(req, err){
        //     console.log(err)
        // }
let answer;
//produce a random flashcard question from the arrOfQuestions array
$('#next').on('click', function()  {
$.ajax({    
            type: 'GET',
            url: '/flashcards',
            success: function(data){
                console.log("inside next func", data)
        var i = Math.floor(Math.random() * data.length);
        console.log(data[i].question)
        answer= data[i].answer
        $('h3').html(data[i].question);
        $('h4').html(data[i].answer);
                            
                            
                        } 
                    }) 
                })


$('#delete').on('click', function()  {
     $.ajax({    
        type: 'DELETE',
        url: '/flashcards', 
        success: function(data) {
        $('h3').remove(data.question);
        $('h4').remove(data.answer);
        }
    }) 
})