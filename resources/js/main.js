// set up of const variables to access the DOM
const tipElement = document.getElementById('tips')
const cooksOldElement = document.getElementById('cooksOld')
const cooksNewElement = document.getElementById('cooksNew')
const serversElement = document.getElementById('servers')
const dishwasherElement = document.getElementById('dishwashers')
const dishwasherTipElement = document.getElementById('dishtip')

// variable assignment and event listeners for input fields from the DOM
let tipInput = 0
let oldCooks = 0
let newCooks = 0
let dishwasher = 0
let dishTipPercent = 0.1
let servers = 0

tipElement.addEventListener('blur', function (tips) {
    tipInput =  Number(tips.target.value)
    console.log(`tips: ${tipInput}`)
})

cooksOldElement.addEventListener('blur', function(num) {
    oldCooks = Number(num.target.value)
    console.log(`old cooks: ${oldCooks}`)
})

cooksNewElement.addEventListener('blur', function(num) {
    newCooks = Number(num.target.value)
    console.log(`new cooks:${newCooks}`)
})

dishwasherElement.addEventListener('blur', function(num) {
    dishwasher = Number(num.target.value)
    console.log(`dishwashers: ${dishwasher}`)
})

dishwasherTipElement.addEventListener('blur', function(num) {
    dishTipPercent = Number(num.target.value) / 100
    console.log(`dish tip percent: ${dishTipPercent}`)
})

serversElement.addEventListener('blur', function (num) {
    servers = Number(num.target.value)
    console.log(`servers: ${servers}`)
})

 // function to floor to the 2nd decimal place
 const convertString = function (num) {
    numString = num.toFixed(3).toString()
    console.log(numString)
    numString = numString.slice(0, numString.indexOf('.') + 3)
    console.log(numString)
    return Number(numString)
}

// button event to calculate the waitress tipout

let calculateWaitressTips = document.getElementById('waitresstipbutton')
calculateWaitressTips.addEventListener('click', function () {
    const waitressOutput = document.getElementById('waitresstipout')
    let halfTips = tipInput / 2
    let serverTips = halfTips / servers
    serverTips = convertString(serverTips)
    waitressOutput.textContent = ''
    if (servers === 0) {
        waitressOutput.textContent = 'Please enter the amount of waitstaff working'
    } else if ( servers < 0) {
        waitressOutput.textContent = 'Please enter a positive number for waitstaff'
    } else if (halfTips < 0) {
        waitressOutput.textContent = 'Please enter a positive tip number'
    } else if (!halfTips) {
        waitressOutput.textContent = 'Please remove any symbols from the fields'
    } else {
        waitressOutput.textContent = `The waitstaff earned $${serverTips} in tips`
    }
})





// button event to calculate tips split and return for cooks and dishwashers
let calculateTips = document.getElementById('kitchentips')
calculateTips.addEventListener('click', function () {
    let totalCooks = oldCooks + newCooks
    let output = document.getElementById('kitchentipoutput')
    let halfTips = tipInput / 2
    let cookGrossTips = halfTips / (oldCooks + newCooks)
    let dishwasherTips = 0;
    let cookNetTips = 0;
    if (dishwasher !== 0) {
        dishwasherTips = (cookGrossTips * oldCooks) * dishTipPercent
        cookNetTips = halfTips - (dishwasherTips * dishwasher)
    } else {
        cookNetTips = halfTips
    }
    let cookDividedTips = cookNetTips / totalCooks   

    cookDividedTips = convertString(cookDividedTips)
    dishwasherTips = convertString(dishwasherTips)
    output.textContent = ''
    if (totalCooks === 0) {
        output.textContent = 'Please enter the amount of cooks working'
    } else if (totalCooks < 0) {
        output.textContent = 'Please enter a positive number for kitchenstaff'
    } else if (halfTips < 0) {
        output.textContent = 'Please enter a positive number for tips'
    } else if (dishTipPercent <= 0) {
        output.textContent = 'Please enter a number greater than 0 for dishwasher tip percent'
    } else if (!halfTips) {
        output.textContent = 'Please remove any symbols from the fields'
    } else if (!dishTipPercent) {
        output.textContent = 'Please remove any symbols from the fields'
    } else {
        output.textContent = `The cooks earned $${cookDividedTips} in tips. The dishwashers earned $${dishwasherTips} in tips`
    }
})
