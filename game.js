const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text 
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'The kingdom of Assetia has been incredibly prosperous over the past 69 years. The country remained peaceful, supporting friendly relations with its neighbor Catistan.',
        options: [
            {
                text: 'Under my reign, the prosperity has continued.',
                nextText: 2
            },
            {
                text: 'As soon as I took the throne, I secretly started planning my invasion of Catistan.',
                setState: { wantsInvasion: true },
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text:  'The first few weeks of your rulership are uneventful. You spend the days learning the ropes and settling into the role of the Assetian monarch.',
        options: [
            {
                text: 'Discuss the Catistian invasion with my most trusted military leaders.',
                requiredState: (currentState ) => currentState.wantsInvasion,
                setState: { wantsInvasion: true, militaryInvasion: true },
                nextText: 3
            },
            {
                text: 'Discuss the Catistian invasion with my royal network of spies.',
                requiredState: (currentState ) => currentState.wantsInvasion,
                setState: { wantsInvasion: true, spiesInvasion: true },
                nextText: 4
            },
            {
                text: 'Spend time with the generals of the kingdom, learning about defenses of Assetia.',
                setState: { focusOnDefense: true },
                nextText: 5
            },
            {
                text: 'Spend time with the nobility of Assetia, learning about the current civilian projects and priorities.',
                setState: { focusOnCivil: true },
                nextText: 6
            }
        ]
    },
    {
        id: 3,
        text:  'You discuss the invasion with the military people. They say things to you.',
        options: [ {
            text: 'Be nice to them.',
            nextText: 7
        },
        {
            text: 'Be a dickbag to them.',
            nextText: 7 
        }
        ]
    },
    {
        id: 4,
        text:  'You discuss the invasion with the spies. They say things to you.',
        options: [ {
            text: 'Be nice to them.',
            nextText: 7
        },
        {
            text: 'Be a dickbag to them.',
            nextText: 7 
        }
        ]
    },
    {
        id: 5,
        text:  'You discuss the defenses of the kingdom with the generals. They say things to you.',
        options: [ {
            text: 'Be nice to them.',
            nextText: 7
        },
        {
            text: 'Be a dickbag to them.',
            nextText: 7 
        }
        ]
    },
    {
        id: 6,
        text:  'You mingle with the nobles and discuss the current projects. They seem to be growing fond of you.',
        options: [ {
            text: 'Be nice to them.',
            nextText: 7
        },
        {
            text: 'Be a dickbag to them.',
            nextText: 7 
        }
        ]
    },
    {
        id: 7,
        text:  'One evening, your sister, the Duchess of Toilette, comes to visit you in the palace.',
        nextText: 8,
        // current task: figure out how to check for states at the nextText step
    },
    {
        id: 8,
        text: '123.',
        options: [
            {
                text: 'Discuss the Catistian invasion with my most trusted military leaders.',
                requiredState: (currentState ) => currentState.wantsInvasion,
                setState: { wantsInvasion: true, militaryInvasion: true },
                nextText: 3
            },
            {
                text: 'Discuss the Catistian invasion with my royal network of spies.',
                requiredState: (currentState ) => currentState.wantsInvasion,
                setState: { wantsInvasion: true, spiesInvasion: true },
                nextText: 4
            },
            {
                text: 'Spend time with the generals of the kingdom, learning about defenses of Assetia.',
                setState: { focusOnDefense: true },
                nextText: 5
            },
            {
                text: 'Spend time with the nobility of Assetia, learning about the current civilian projects and priorities.',
                setState: { focusOnCivil: true },
                nextText: 6
            }
        ]
    }
]

startGame()
