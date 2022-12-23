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
                nextText: 3
            },
            {
                text: 'Spend time with the generals of the kingdom, learning about defenses of Assetia.',
                setState: { focusOnDefense: true },
                nextText: 3
            },
            {
                text: 'Spend time with the nobility of Assetia, learning about the current civilian projects and priorities.',
                setState: { focusOnCivil: true },
                nextText: 3
            }
        ]
    }
]

startGame()
