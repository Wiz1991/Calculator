//--------Operations----------//
const add = (num1, num2) => result = num1 + num2
const subtract = (num1, num2) => result = num1 - num2
const multiply = (num1, num2) => result = num1 * num2
const divide = (num1, num2) => result = num1 / num2
const sqrt = (num) => result = Math.sqrt(num)
const pow2 = (num) => result = Math.pow(num, 2)

const operate = (operator, num1, num2) => operator(num1, num2)


let num1
let num2
let operator
let histogram = ''
let result = ''

document.querySelectorAll('.num').forEach(element => {
    element.addEventListener('click', e => {
        let num = e.target.innerHTML
        histogram += `${num}`
        if (num1 == undefined) {
            num1 = num
        } else if (operator == undefined) {
            num1 += num
        } else if (num2 == undefined) {
            num2 = num
        } else {
            num2 += num
        }
    })
})
document.querySelectorAll('.functor').forEach(element => {
    element.addEventListener('click', e => {
        let operation = e.target.dataset.func

        switch (operation) {
            case 'solve':
                if (num1 != undefined && num2 != undefined && operator != undefined) {
                    operate(operator, Number(num1), Number(num2))
                    clearData()
                    num1 = result
                    
                }
                break
            case 'add':
                if (operator != undefined) {
                    operate(add, Number(num1), Number(num2))
                    clearData()
                    num1=result
                }
                operator = add
                histogram += ` ${e.target.innerHTML} `
                break
            case 'subtract':
                if (operator != undefined) {
                    operate(subtract, Number(num1), Number(num2))
                    clearData()
                    num1=result
                }
                operator = subtract
                histogram += ` ${e.target.innerHTML} `
                break
            case 'divide':
                if (operator != undefined) {
                    operate(divide, Number(num1), Number(num2))
                    clearData()
                    num1=result
                }
                operate = divide
                histogram += ` ${e.target.innerHTML} `
                break
            case 'multiply':
                if (operator != undefined) {
                    operate(multiply, Number(num1), Number(num2))
                    clearData()
                    num1=result
                    
                }
                operator = multiply
                histogram += ` ${e.target.innerHTML} `
                break
            default:
                break
        }
        if(histogram.length > 33){
            histogram=result
        }




    })
})
document.querySelectorAll('.key').forEach(element => {
    element.addEventListener('click', e => {
        updateScreen()
    })
})

function clearData() {
    num1 = undefined
    num2 = undefined
    document.querySelector('.histogram').innerHTML = ''
}

function updateScreen() {
    document.querySelector('.histogram').innerHTML = histogram
    document.querySelector('.calculations').innerHTML = result
}