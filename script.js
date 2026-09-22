//题目数据，可以自己增删题目
const questions = [
  {
    question: "What is 2 + 2 ?",
    answers: ["3","4","5","6"],
    correct:1
  },
  {
    question: "Which planet is known as Red Planet?",
    answers: ["Venus","Mars","Jupiter","Saturn"],
    correct:1
  },
  {
    question: "How many continents are there?",
    answers: ["5","6","7","8"],
    correct:2
  },
  {
    question: "What is capital of France?",
    answers: ["London","Berlin","Paris","Madrid"],
    correct:2
  },
  {
    question: "Which animal is the largest land mammal?",
    answers: ["Lion","Elephant","Giraffe","Bear"],
    correct:1
  }
];

//DOM元素
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionEl = document.getElementById('current-question');
const scoreEl = document.getElementById('score');
const progressEl = document.getElementById('progress');

const finalScoreEl = document.getElementById('final-score');
const resultMessageEl = document.getElementById('result-message');

let currentIndex = 0;
let score = 0;
const total = questions.length;

//切换屏幕
function showScreen(screen){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    screen.classList.add('active');
}

//开始游戏
startBtn.addEventListener('click', ()=>{
    currentIndex = 0;
    score = 0;
    scoreEl.textContent = score;
    renderQuestion();
    showScreen(quizScreen);
});

//渲染当前题目
function renderQuestion(){
    const q = questions[currentIndex];
    questionText.textContent = q.question;
    currentQuestionEl.textContent = currentIndex +1;

    //更新进度条
    const percent = ((currentIndex)/total)*100;
    progressEl.style.width = percent + "%";

    //清空旧答案
    answersContainer.innerHTML = "";

    //生成答案按钮
    q.answers.forEach((ans,idx)=>{
        const btn = document.createElement('button');
        btn.className = "answer-btn";
        btn.textContent = ans;
        btn.dataset.index = idx;
        btn.addEventListener('click',()=>handleAnswer(idx));
        answersContainer.appendChild(btn);
    })
}

//处理选择答案
function handleAnswer(selectedIndex){
    const q = questions[currentIndex];
    if(selectedIndex === q.correct){
        score++;
        scoreEl.textContent = score;
    }
    currentIndex++;
    if(currentIndex >= total){
        showResult();
    }else{
        renderQuestion();
    }
}

//展示结果页面
function showResult(){
    finalScoreEl.textContent = score;
    //进度条拉满
    progressEl.style.width = "100%";

    if(score >= total*0.8){
        resultMessageEl.textContent = "Excellent!";
    }else if(score >= total*0.5){
        resultMessageEl.textContent = "Good Job!";
    }else{
        resultMessageEl.textContent = "Keep Practicing!";
    }
    showScreen(resultScreen);
}

//重新开始
restartBtn.addEventListener('click',()=>{
    showScreen(startScreen);
})

//页面打开默认显示开始页
showScreen(startScreen);
