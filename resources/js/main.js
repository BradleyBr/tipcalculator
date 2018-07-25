// set up of const variables to access the DOM
const tipElement = document.getElementById('tips')
const cooksOldElement = document.getElementById('cooksOld')
const cooksNewElement = document.getElementById('cooksNew')
const serversOldElement = document.getElementById('serversOld')
const serversNewElement = document.getElementById('serversNew')
const dishwasherElement = document.getElementById('dishwashers')
const dishwasherTipElement = document.getElementById('dishtip')

// variable assignment and event listeners for input fields from the DOM
let tipInput = 0
let oldCooks = 0
let newCooks = 0
let dishwasher = 0
let dishTipPercent = 0.1
let oldServers = 0
let newServers = 0

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

serversOldElement.addEventListener('blur', function (num) {
    oldServers = Number(num.target.value)
    console.log(`old servers: ${oldServers}`)
})

serversNewElement.addEventListener('blur', function (num) {
    newServers = Number(num.target.value)
    console.log(`new servers: ${newServers}`)
})

// button event to calculate tips split and return 3 pools of tips, cooks, servers and the dishwasher
let calculateTips = document.getElementById('splitTips')
calculateTips.addEventListener('click', function () {
    let totalCooks = oldCooks + newCooks
    let totalServers = oldServers + newServers
    let output = document.getElementById('tipOutput')
    let halfTips = tipInput / 2
    let cookGrossTips = halfTips / (oldCooks + newCooks)
    let dishwasherTips = 0;
    if (dishwasher !== 0) {
        dishwasherTips = (cookGrossTips * oldCooks) * dishTipPercent
    }
    let cookNetTips = halfTips - dishwasherTips
    let cookDividedTips = cookNetTips / totalCooks
    let serverTips = halfTips / totalServers
   
    // function to floor to the 2nd decimal place
    let convertString = function (num) {
        numString = num.toFixed(3).toString()
        console.log(numString)
        numString = numString.slice(0, numString.indexOf('.') + 3)
        console.log(numString)
        return Number(numString)
    }

    cookDividedTips = convertString(cookDividedTips)
    serverTips = convertString(serverTips)
    dishwasherTips = convertString(dishwasherTips)
    output.textContent = ''
    output.textContent = `Cooks earned $${cookDividedTips.toFixed(2)}.
    Dishwasher earned $${dishwasherTips.toFixed(2)}. Servers earned $${serverTips.toFixed(2)}`
})
