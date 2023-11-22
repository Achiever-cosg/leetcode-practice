function generateRandomNumber(min, max) {
    const randomNumber = Math.ceil(Math.random() * (max - min + 1) + min);
    console.log('Random Number:', randomNumber);
    return randomNumber;
}

async function fetchJsonData(url, randomNumber) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

const jsonUrl = 'https://gist.githubusercontent.com/dabasajay/1c42402db1b5a1b47ea009e67ad3effe/raw/e9829d1cd0b14924688b3518557367bb23682db3/problemslist.json';
async function processRandomNumberAndJson() {
    try {
        const fetchedData = await fetchJsonData(jsonUrl);
        return fetchedData;
    } catch (error) {
        return null; 
    }
}

function getQuestionUrl(data, randomNumber) {
    // console.log(data.length);
    for (let i = 0; i < data.length; i++) {
        if (data[i].stat.question_id == randomNumber) {
            console.log("Question id found");
            var res = {
                question_no: data[i].stat.frontend_question_id,
                title: data[i].stat.question__title,
                url: data[i].stat.question__title_slug,
            }
            break;
        }
    }
    return res;
}

var cnt = 0;
document.getElementById("fetch-button").addEventListener("click", async () => {
    try {
        const result = await processRandomNumberAndJson();
        if (result) {
            cnt++;
            const randomNumber = generateRandomNumber(1, 2000);
            var mockQuestion = getQuestionUrl(result.stat_status_pairs, randomNumber);

            const questionTitleElement = document.getElementById("question-title");
            const questionLinkElement = document.getElementById("question-link");
            const count  = document.getElementById("counter");

            questionTitleElement.textContent = mockQuestion.question_no + ". " + mockQuestion.title;
            const question_url = "https://leetcode.com/problems/" + mockQuestion.url;
            questionLinkElement.innerHTML = `<a href="${question_url}" target="_blank">${question_url}</a>`;
            count.textContent = cnt;
        } else {
            console.log('An error occurred during processing.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }

    const countElement = document.createElement("counter");
    
});


// function displayArray(mockQuestion) {
//     const outputContainer = document.getElementById("container");

//     const ulElement = document.createElement("ul");

//     questions.forEach(item => {
//         // const questionTitleElement = document.getElementById("question-title");
//         // const questionLinkElement = document.getElementById("question-link");

//         const liElement = document.createElement("li");
//         liElement.textContent = mockQuestion.question_no + ". " + mockQuestion.title;
//         const question_url = "https://leetcode.com/problems/" + mockQuestion.url;
//         liElement.innerHTML = `<a href="${question_url}" target="_blank">${question_url}</a>`;

//         ulElement.appendChild(liElement);
//     });

//     outputContainer.appendChild(ulElement)
// }



