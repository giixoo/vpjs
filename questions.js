const questions = [
    {
        type: 'select',
        name: 'canvasSize',
        message: 'Canvas size?',
        choices: [
            {title: "50x70", value: {x: 500, y: 700}},
            {title: "50x50", value: {x: 500, y: 500}},
            {title: "40x50", value: {x: 400, y: 500}},
            {title: "30x40", value: {x: 300, y: 400}}
        ]
    },
    {
        type: 'select',
        name: 'margin',
        message: 'Margin',
        choices: [
            {title: "5", value: 50},
            {title: "2.5", value: 25},
            {title: "1", value: 10},
            {title: "0", value: 0}
        ]
    },
    {
        type: 'select',
        name: 'border',
        message: 'Draw canvas border?',
        choices: [
            {title: "Yes", value: true},
            {title: "No", value: false}
        ]
    }
];

module.exports = questions;