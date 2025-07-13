const prompts = require('prompts');
const questions = require('./questions');


(async () => {
  const response = await prompts(questions);
  console.log(response);
})();