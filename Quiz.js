let questions = [];

function toggleOpt() {

    const questType = document.getElementById('qstntype').value;

    if (questType === 'tf') {
        document.getElementById('tfblock').style.display = "block";
        document.getElementById('mcqblock').style.display = "none";
    }
    if (questType === "mcq") {
        document.getElementById('tfblock').style.display = "none";
        document.getElementById('mcqblock').style.display = "block";
    }
}

function addQues() {
    const ques = document.getElementById('questn').value;
    const questType = document.getElementById('qstntype').value;

    let newQues = { text: ques, type: questType };

    if (questType === "tf") {
        newQues.correctAns = document.querySelector('input[name="tfans"]:checked').value;   
    }
    else {
        const options = Array.from(document.querySelectorAll('.option')).map(opt => opt.value);
        const correctAnswers = options.filter((opt, index) => document.querySelectorAll('.correctAnswer')[index].checked);
        
        newQuestion.options = options;
        newQuestion.correctAnswers = correctAnswers;
    }
    
    questions.push(newQues);
    displayQues();
    document.getElementById('addQuestionForm').reset();
    toggleOpt();
}

function displayQues() {

    const questType = document.getElementById('qstntype').value;
    
    const quiz = document.getElementById('quiz');
    quiz.innerHTML = ''; 

    questions.forEach((question, index) => {
        let newques = `<div class="question"><p>${index + 1}. ${question.text}</p>`

        if (questType === "tf") {
            newques += `
                <input type='radio' name='q${index}' value="True"> True<br>
                <input type="radio" name="q${index}" value="False"> False<br>
            `;
        }
        else {
            question.options.forEach(option => {
                const inputType = question.type === "single" ? "radio" : "checkbox";
                newques += `<input type="${inputType}" name="q${index}" value="${option}"> ${option}<br>`;
            });
        }

        newques += "</div>"
        quiz.innerHTML += newques
    
    });

}

function submitQuiz() {
    let score = 0;
    let feedback = '';

    questions.forEach((question, index) => {
        const userAnswers = Array.from(document.querySelectorAll(`input[name="q${index}"]:checked`)).map(input => input.value);
            
        if (question.type === "tf") {
            if (userAnswers[0] === question.correctAns) {
                feedback += `<p class="correct">${index + 1}. Correct!</p>`;
                score++;
            } else {
                feedback += `<p class="incorrect">${index + 1}. Incorrect. Correct answer: ${question.correctAnswer}</p>`;
            }
        } 
        else {
            const isCorrect = question.correctAnswers.length === userAnswers.length &&
                              question.correctAnswers.every(answer => userAnswers.includes(answer));

            if (isCorrect) {
                feedback += `<p class="correct">${index + 1}. Correct!</p>`;
                score++;
            } else {
                feedback += `<p class="incorrect">${index + 1}. Incorrect. Correct answers: ${question.correctAnswers.join(', ')}</p>`;
            }
        }
    });

    document.getElementById("result").innerHTML = `You scored ${score} out of ${questions.length}.<br><br>` + feedback;
}

