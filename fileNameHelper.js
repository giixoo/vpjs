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

        return await prompts([fileQuestion]);
    } catch (error) {
        console.error('Error reading directory:', error);
        throw error;
    }
}

module.exports = getFileName;