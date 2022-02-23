const quizData = [
  {
    question: 'What is the most used programming language in 2019?',
    a: 'Java',
    b: 'C',
    c: 'Python',
    d: 'JavaScript',
    correct: 'd',
  },
  {
    question: 'Who is the President of US?',
    a: 'Florin Pop',
    b: 'Donald Trump',
    c: 'Ivan Saldano',
    d: 'Mihai Andrei',
    correct: 'b',
  },
  {
    question: 'What does HTML stand for?',
    a: 'Hypertext Markup Language',
    b: 'Cascading Style Sheet',
    c: 'Jason Object Notation',
    d: 'Helicopters Terminals Motorboats Lamborginis',
    correct: 'a',
  },
  {
    question: 'What year was JavaScript launched?',
    a: '1996',
    b: '1995',
    c: '1994',
    d: 'none of the above',
    correct: 'b',
  },
];
const quizHeader = document.querySelector('.quiz-header');
const question = document.querySelector('.question-phrase');
const optionA = document.querySelector('.option-a');
const optionB = document.querySelector('.option-b');
const optionC = document.querySelector('.option-c');
const optionD = document.querySelector('.option-d');
const btn = document.querySelector('.btn');
const notification = document.querySelector('.notification p');

const p = document.createElement('p');

let index = 0;
let score = 0;

window.addEventListener('DOMContentLoaded', displayQuestion);
btn.addEventListener('click', () => {
  const userAnswer = document.querySelector('input[name="answer"]:checked').id;
  if (userAnswer === quizData[index].correct) {
    score += 1;
    notification.textContent = 'Correct !';
    notification.style.color = '#16a34a';
    p.remove();
  } else {
    notification.textContent = 'Wrong !';
    notification.style.color = '#dc2626';
    let x = quizData[index].correct;
    const correctAnswer = quizData[index][x];

    p.innerText = `Correct Answer ( ${correctAnswer} )`;
    notification.parentElement.appendChild(p);
  }
  if (index < quizData.length - 1) {
    index += 1;
    displayQuestion();
  } else {
    quizHeader.innerHTML = `
    <div class="quiz-header">
      <h2>Quiz Result : </h2>
      <h3>${score} / ${quizData.length} Correct</h3>
      </div>
      <button class="refresh" onclick="document.location.reload()">Try Again</button>
    `;
    btn.remove();
  }
});

function displayQuestion() {
  question.textContent = quizData[index].question;
  optionA.textContent = quizData[index].a;
  optionB.textContent = quizData[index].b;
  optionC.textContent = quizData[index].c;
  optionD.textContent = quizData[index].d;
}
