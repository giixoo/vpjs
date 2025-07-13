const prompts = require('prompts');
const questions = require('./questions');
const {getFileName, removeDotSlash, formatOutputFileName, changeExtension} = require("./FileNameHelper");
const {runProcessAndWait} = require("./ExecutionHelper");
const {generateSvgArgs, generateGcodeArgs} = require("./VPypeArgHelper");

let svgInputFile = removeDotSlash(process.argv[2]);

(async () => {

  if (!svgInputFile ) {
    svgInputFile = await getFileName(svgInputFile);
  }
  console.log('Processing file:', svgInputFile);

  const vPypeConfig = await prompts(questions);
  console.log(vPypeConfig);

  // collect arguments
  const svgOutputFile = formatOutputFileName(svgInputFile, vPypeConfig);
  const gcodeOutputFileName = changeExtension(svgOutputFile, '.gcode');
  const svgArgs = generateSvgArgs(svgInputFile, svgOutputFile, vPypeConfig);
  const gcodeArgs = generateGcodeArgs(svgOutputFile, gcodeOutputFileName);

  // vpype params
  console.log(svgArgs);
  console.log(gcodeArgs);

  // generating svg
  await runProcessAndWait('vpype', svgArgs);
  console.log('SVG file generated:', svgOutputFile);

  // generating gcode
  await runProcessAndWait('vpype', gcodeArgs);
  console.log('Gcode file generated:', gcodeOutputFileName);

})();