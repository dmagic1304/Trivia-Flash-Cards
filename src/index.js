function getQuestions() {
  console.log('test');
  let request = new XMLHttpRequest();
  let url = 'https://the-trivia-api.com/api/questions?limit=1&difficulty=easy';

  request.addEventListener('loadend', function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printQuestions(response);
    } else {
      printError(response);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function printQuestions(apiResponse) {
  document.getElementById('question').innerText = apiResponse[0].question;
  let answerArray = [apiResponse[0].correctAnswer, apiResponse[0].incorrectAnswers[0], apiResponse[0].incorrectAnswers[1], apiResponse[0].incorrectAnswers[2]];
  answerArray.sort();
  console.log(answerArray);
  const ul = document.querySelector("#list");
  ul.innerHTML = null;
  answerArray.forEach(answer => {
    let li = document.createElement("li");
    li.append(answer);
    ul.append(li);
  });
  // let answer1 = answerArray[Math.random()]
  // let answer2 = apiResponse[0].incorrectAnswers[1];
  // let answer3 = apiResponse[0].incorrectAnswers[2];
  // let answer4 = apiResponse[0].incorrectAnswers[3];
}

function printError() {
  document.getElementById('question').innerText = 'error';
}

window.addEventListener('load', function() {
document.getElementById('submitt-btn').addEventListener('click', getQuestions);
})