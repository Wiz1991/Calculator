//--------Operations----------//
const add = (num1, num2) => result = Number(num1) + Number(num2)
const subtract = (num1, num2) => result = Number(num1) - Number(num2)
const multiply = (num1, num2) => result = Number(num1) * Number(num2)
const divide = (num1, num2) => result = Number(num1) / Number(num2)
const sqrt = (num) => result = Math.sqrt(Number(num))
const pow2 = (num) => result = Math.pow(Number(num), 2)

function operate(operator, num1, num2){
    switch(operator){
        case 'add':
            return add(num1,num2)
        case 'subtract':
            return subtract(num1,num2)
        case 'multiply':
            return multiply(num1,num2)
        case 'divide':
            return divide(num1,num2)
        case 'sqrt':
            const root = calculator.waitForSecondOperand ? sqrt(num1) : sqrt(num2)
            return root
        case 'pow2':
            const squared = calculator.waitForSecondOperand ? pow2(num1) : pow2(num2)
            return squared
        default:
            return "ERROR"
    }
}

const getOperatorSymbol = (symbol) => {
    switch(symbol){
        case 'add':
            return '+'
        case 'subtract':
            return '-'
        case 'multiply':
            return 'X'
        case 'divide':
            return '/'
        case 'sqrt':
            return `&radic;`
        case 'pow2':
            return `²`
        case 'solve':
            return `= ${calculator.displayValue}`
        default:
            return "ERROR"
    }   
}

const getNewCalculator = () => {
    return {
        firstOperand: null,
        operator: null,
        waitForSecondOperand: false,
        displayValue: '0',
        history: '',
    }
}

let calculator = {
    firstOperand: null,
    operator: null,
    waitForSecondOperand: false,
    resetHistory: false,
    displayValue: '0',
    history: '',
}


document.querySelectorAll('.key').forEach(element => {
    element.addEventListener('click', e => {
        const { target } = event
        const { history } = calculator

    

        if (target.classList.contains('operator')) {
            handleOperator(target.dataset.func)
        }
        if (target.classList.contains('digit')) {
            handleDigits(target.innerHTML)
            calculator.history= history + target.innerHTML
        }



        updateDisplay()
    })
})

function handleDigits(digit) {

    const { displayValue: result,waitForSecondOperand } = calculator
    if (calculator.displayValue.length > 16 && !waitForSecondOperand) {
        alert(`You can't input any number longer than 16 digits!`)
        return
    }
    //
    if(waitForSecondOperand === true){
        calculator.displayValue = digit
        calculator.waitForSecondOperand = false
    }else{
        calculator.displayValue = result === '0' ? digit : result + digit
        calculator.firstOperand = calculator.displayValue
    }
}
function handleOperator(operation){
    const { firstOperand, operator, displayValue: result } = calculator
    const input  = parseFloat(result)
    let { history } = calculator

    // sqrt and pow2 operations can be performed on only one operand
    if(operation == 'pow2' || operation == 'sqrt'){

        const result = operate(operation,firstOperand,input)

        calculator.displayValue = String(result)
        if(calculator.waitForSecondOperand){
            calculator.firstOperand  = result
        }
        calculator.history = history + ` ${getOperatorSymbol(operation)}  `
        return
    }
    //if another operator is clicked while one is already set and we only have one number-
    //change the operator, update history and return
    if(operator && calculator.waitForSecondOperand){
        calculator.operator = operation
        calculator.history = history + ` ${getOperatorSymbol(calculator.operator)} `
        return
    }
    //if the operator is set calculate and set result as first operand so operations can be chained
    if (operator){
        const result = operate(calculator.operator,firstOperand,input)

        calculator.displayValue = String(result)
        calculator.firstOperand = result
    }
    
    //result is now set as first operand so we are waiting for the second operand
    calculator.waitForSecondOperand = true
    //set the inputed operand
    calculator.operator = operation
    //update history
    calculator.history = history + ` ${getOperatorSymbol(calculator.operator)} `
}

function updateDisplay() {
    const resultDesplay = document.querySelector('.result')
    resultDesplay.innerHTML = calculator.displayValue

    const historyDisplay = document.querySelector('.histogram')
    historyDisplay.innerHTML = calculator.history

}


function clearData() {
    calculator = getNewCalculator()
}


document.getElementById('clear').addEventListener('click', e => {
    clearData()
    updateDisplay()
})

document.getElementById('undo').addEventListener('click',(e) => {
    let str = calculator.displayValue
    str = str.substring(0, str.length - 1)
    calculator.displayValue = str

    let { history } = calculator
    history = history.substring(0,history.length -1) 
    calculator.history = history

    updateDisplay()
})




