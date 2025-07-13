const prompts = require('prompts');
const questions = require('./questions');
const getFileName = require("./fileNameHelper");

let svgInputFile = removeDotSlash(process.argv[2]);
console.log('Processing file:', svgInputFile);

(async () => {

  if (!svgInputFile ) {
    svgInputFile = await getFileName(svgInputFile);
  }

  const response = await prompts(questions);

  console.log(response);
})();

function removeDotSlash(str) {
  if (!str) {return str;}
  if (str.startsWith('./')) {
    return str.substring(2);
  }
  return str;
}