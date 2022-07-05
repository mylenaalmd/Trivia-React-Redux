import md5 from 'crypto-js/md5';

export const initialState = {
  player: {
      gravatarEmail: 'andre_teixeira@gmail.com',
      name: 'Andre Teixeira',
      score: 0,
      assertions: 0,
      token: 'e70876f45264f86b1e04b697196efef274cc7c5c847bc3ba55fad5ce265eab31',
  },
};

export const data = {
  response_code: 0,
  results: [
    {
      category: "Entertainment: Books",
      type: "multiple",
      difficulty: "medium",
      question: "Who wrote the children&#039;s story &quot;The Little Match Girl&quot;?",
      correct_answer: "Hans Christian Andersen",
      incorrect_answers: [
        "Charles Dickens",
        "Lewis Carroll",
        "Oscar Wilde"
      ]
    },
    {
      category: "Entertainment: Music",
      type: "multiple",
      difficulty: "hard",
      question: "Which member of the English band &quot;The xx&quot; released their solo album &quot;In Colour&quot; in 2015?",
      correct_answer: "Jamie xx",
      incorrect_answers: [
        "Romy Madley Croft",
        "Oliver Sim",
        "Baria Qureshi"
      ]
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "medium",
      question: "What level do you have to be to get a service medal on CS:GO?",
      correct_answer: "40",
      incorrect_answers: [
        "50",
        "30",
        "20"
      ]
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "medium",
      question: "Which Sonic the Hedgehog game introudced Knuckles the Echidna?",
      correct_answer: "Sonic the Hedgehog 3",
      incorrect_answers: [
        "Sonic the Hedgehog 2",
        "Sonic &amp; Knuckles",
        "Sonic Adventure"
      ]
    },
    {
      category: "Vehicles",
      type: "multiple",
      difficulty: "easy",
      question: "What country was the Trabant 601 manufactured in?",
      correct_answer: "East Germany",
      incorrect_answers: [
        "Soviet Union",
        "Hungary",
        "France"
      ]
    }
  ]
}

export const emailHash = md5('andre_teixeira@gmail.com').toString();
export const emailHash1 = md5('gustavo_cabral@gmail.com').toString();
export const gravatar0 = `https://www.gravatar.com/avatar/${emailHash}`;
export const gravatar1 = `https://www.gravatar.com/avatar/${emailHash1}`;
export const storageData = [{
  picture: gravatar1,
  name: 'Andre Teixeira',
  score: 26,
  assertions: 1,
},
{
  picture: gravatar0,
  name: 'Gustavo Cabral',
  score: 45,
  assertions: 3,
}];

export const invalidInitialState = {
  player: {
      token: '',
  }
};
