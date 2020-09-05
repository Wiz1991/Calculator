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

const getNewCalculator = () => {
    return {
        firstOperand: null,
        operator: null,
        waitForSecondOperand: false,
        displayValue: '0',
        history: '0',
    }
}

let calculator = {
    firstOperand: null,
    operator: null,
    waitForSecondOperand: false,
    displayValue: '0',
    history: '0',
}


document.querySelectorAll('.key').forEach(element => {
    element.addEventListener('click', e => {
        const { target } = event

        if (target.classList.contains('operator')) {
            handleOperator(target.dataset.func)
            
        }
        if (target.classList.contains('digit')) {
            handleDigits(target.innerHTML)
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

   
    if(operation == 'pow2' || operation == 'sqrt'){

        const result = operate(operation,firstOperand,input)

        calculator.displayValue = String(result)
        calculator.firstOperand  = result
        return
    }

    if(operator && calculator.waitForSecondOperand){
        calculator.operator = operation
    }
    if (operator){
        const result = operate(calculator.operator,firstOperand,input)

        calculator.displayValue = String(result)
        calculator.firstOperand = result
    }


    calculator.waitForSecondOperand = true
    calculator.operator = operation

    console.log(JSON.stringify(calculator,null,4))
}

function updateDisplay() {
    const dispaly = document.querySelector('.result')
    dispaly.innerHTML = calculator.displayValue
}


function clearData() {
    calculator = getNewCalculator()
}


document.getElementById('clear').addEventListener('click', e => {
    clearData()
    updateDisplay()
})