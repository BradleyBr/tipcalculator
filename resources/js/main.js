// set up of const variables to access the DOM
const tipElement = document.getElementById('tips')
const cooksElement = document.getElementById('cooks')
const dishCooksElement = document.getElementById('cooksdishtip')
const serversElement = document.getElementById('servers')
const dishwasherElement = document.getElementById('dishwashers')
const dishwasherTipElement = document.getElementById('dishtip')
const tipTotalElement = document.getElementById('tipsum')

// variable assignment and event listeners for input fields from the DOM
let tipInput = 0
let cooks = 0
let dishCooks = 0
let dishwasher = 0
let dishTipPercent = 0.1
let servers = 0
let tipSum = 0

// display tip table sum at the start of the DOM load up
tipTotalElement.textContent = tipSum

tipElement.addEventListener('blur', function (tips) {
    tipInput =  Number(tips.target.value)
})

cooksElement.addEventListener('blur', function(num) {
    cooks = Number(num.target.value)
    console.log(`old cooks: ${cooks}`)
})

dishCooksElement.addEventListener('blur', function(num) {
    dishCooks = Number(num.target.value)
    console.log(`new cooks:${dishCooks}`)
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

// function to add individual tip numbers to a table list on the DOM, and to be able to remove them
tipElement.addEventListener('keydown', function(event) {
    if(event.keyCode === 13) {
       console.log(Number(event.target.value).toFixed(2))
        document.getElementById('tipnumbers').insertAdjacentHTML('afterbegin', `<tr><td>${Number(event.target.value).toFixed(2)}<i id="cleartips" class="fas fa-times"></i></td></tr>`)
        tipSum += Number(event.target.value)
        tipTotalElement.textContent = convertString(tipSum).toFixed(2)
        let clearTipValue = document.getElementById('cleartips')
        clearTipValue.addEventListener('click', function() {
            tipSum -= Number(clearTipValue.parentNode.textContent)
            tipTotalElement.textContent = convertString(tipSum)
            clearTipValue.parentNode.parentNode.parentNode.parentNode.removeChild(clearTipValue.parentNode.parentNode.parentNode)
        })
        tipElement.value = ''
    }
})

// function for input fields to let the enter key, or enter on the number pad for phones, to move off the field
const inputlistener = function (inputElement) {
    inputElement.addEventListener('keydown', function(event) {
        if(event.keyCode === 13) {
            this.blur()
        }
    })
}

inputlistener(cooksElement)
inputlistener(dishCooksElement)
inputlistener(serversElement)
inputlistener(dishwasherElement)
inputlistener(dishwasherTipElement)

 // function to floor to the 2nd decimal place
 const convertString = function (num) {
    let numString = num.toFixed(3).toString()
    numString = numString.slice(0, numString.indexOf('.') + 3)
    return Number(numString)
}



// click event for computing tips, taking the input fields and outputing tips for frontstaff, cooks and dishwashers
document.getElementById('stafftips').addEventListener('click', function () {
    let combinedStaff = servers + cooks
    let earnedTips = tipSum / combinedStaff
    let dishCookCombined = earnedTips * dishCooks
    let dishTipOutGross = dishCookCombined * dishTipPercent
    let dishTipOutNet = dishTipOutGross * dishwasher
    let cookTipsGross = earnedTips * cooks
    let cookTipsNet = cookTipsGross - dishTipOutNet
    let cookTipsDivided = cookTipsNet / cooks
    earnedTips = convertString(earnedTips)
    cookTipsDivided = convertString(cookTipsDivided)
    dishTipOutNet = convertString(dishTipOutNet)
    output = document.getElementById('tipoutput')
    output.innerHTML = ''
    if (cooks === 0 && servers === 0 && tipSum === 0) {
        output.innerHTML = 'Please enter information into the fields' 
    } else if (cooks === 0) {
        output.innerHTML = 'Please enter the amount of cooks working'
    } else if (cooks < 0) {
        output.innerHTML = 'Please enter a positive number for kitchen staff'
    } else if (servers === 0) {
        output.innerHTML = 'Please enter the amount of waitstaff working'
    } else if (servers < 0) {
        output.innerHTML = 'Please enter a positive number of waitsaff'
    } else if (earnedTips === 0) {
        output.innerHTML = 'Please enter the amount of tips earned'
    } else if (earnedTips < 0) {
        output.innerHTML = 'Please enter a positive number of tips earned'
    } else if (dishwasher === 0 ) {
        output.innerHTML = `For the front staff: ${servers} piles of $${earnedTips.toFixed(2)}
                        </br></br>For the cooks: ${cooks} piles of $${cookTipsDivided.toFixed(2)}`
    } else {
        output.innerHTML = `For the front staff: ${servers} piles of $${earnedTips.toFixed(2)}
                        </br></br>For the cooks: ${cooks} piles of $${cookTipsDivided.toFixed(2)}
                        </br></br>For the dishwashers: ${dishwasher} pile(s) of $${(dishTipOutNet / dishwasher).toFixed(2)}`
    }
})

