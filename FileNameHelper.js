const prompts = require('prompts');
const fs = require('fs/promises');
const path = require('path');

async function getFileName(directory) {
    try {
        if (!directory) {directory = process.cwd();}
        const files = await fs.readdir(directory);
        const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');

        const fileChoices = svgFiles.map(file => ({
            title: file,
            value: file
        }));

        const fileQuestion = {
            type: 'autocomplete',
            name: 'selectedFile',
            message: 'Select SVG file to process',
            choices: fileChoices,
            suggest: (input, choices) => {
                const inputLower = input.toLowerCase();
                return choices.filter(choice =>
                    choice.title.toLowerCase().includes(inputLower)
                );
            }
        };

        const selected =  await prompts([fileQuestion]);
        return selected.selectedFile;
    } catch (error) {
        console.error('Error reading directory:', error);
        throw error;
    }
}

function removeDotSlash(str) {
    if (!str) {return str;}
    if (str.startsWith('./')) {
        return str.substring(2);
    }
    return str;
}

function formatDateTime() {
    const now = new Date();
    return now.getFullYear().toString() +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0') + '-' +
        now.getHours().toString().padStart(2, '0') +
        now.getMinutes().toString().padStart(2, '0');
}

function formatOutputFileName(fileName, svgConfig) {
    if (!fileName) return fileName;
    const parsedPath = path.parse(fileName);
    return `${parsedPath.name}-out-${svgConfig.canvasSize.x}x${svgConfig.canvasSize.y}-${formatDateTime()}${parsedPath.ext}`;
}


function changeExtension(fileName, newExtension) {
    if (!fileName) return fileName;
    const parsedPath = path.parse(fileName);
    const ext = newExtension.startsWith('.') ? newExtension : `.${newExtension}`;
    return path.join(parsedPath.dir, `${parsedPath.name}${ext}`);
}

module.exports = {getFileName, removeDotSlash, formatOutputFileName, changeExtension};