// set up of const variables to access the DOM
const oldCashTipElement = document.getElementById('oldcashtips')
const oldDebitTipElement = document.getElementById('olddebittips')
const oldCashTakeOutElement = document.getElementById('oldcashtakeout')
const oldDebitTakeOutElement = document.getElementById('olddebittakeout')
const newCashTipElement = document.getElementById('newcashtips')
const newDebitTipElement = document.getElementById('newdebittips')
const tipTotalElement = document.getElementById('tiptotal')
const cooksElement = document.getElementById('cooks')
const dishCooksElement = document.getElementById('cooksdishtip')
const serversElement = document.getElementById('servers')
const dishwasherElement = document.getElementById('dishwashers')
const dishwasherTipElement = document.getElementById('dishtip')


// variable assignment and event listeners for input fields from the DOM
let oldCashTips = 0
let oldDebitTips = 0
let oldCashTakeOut = 0
let oldDebitTakeOut = 0
let newCashTips = 0
let newDebitTips = 0
let cooks = 0
let dishCooks = 0
let dishwasher = 0
let dishTipPercent = 0.1
let servers = 0
let tipSum = 0
let optionalKitchen = 0
let optionalFront = 0
let optionalDishwasher = 0

// display tip table sum at the start of the DOM load up
tipTotalElement.textContent = tipSum

cooksElement.addEventListener('blur', function(num) {
    cooks = Number(num.target.value)
})

dishCooksElement.addEventListener('blur', function(num) {
    dishCooks = Number(num.target.value)
})

dishwasherElement.addEventListener('blur', function(num) {
    dishwasher = Number(num.target.value)
})

dishwasherTipElement.addEventListener('blur', function(num) {
    dishTipPercent = Number(num.target.value) / 100
})

serversElement.addEventListener('blur', function (num) {
    servers = Number(num.target.value)
})

let truncateToDecimals = function (num, dec = 2) {
    const calcDec = Math.pow(10, 2)
    return Math.trunc(num * calcDec) / calcDec
}

// function to give event listeners to the input fields for tips
const tipInputListener = function (element, tipVar) {
    element.addEventListener('keydown', function (event) {
        if(event.keyCode === 13) {
            if(tipVar !== 0) {
                tipSum -= truncateToDecimals(Number(tipVar))
            }
            tipVar = truncateToDecimals(Number(event.target.value))
            tipSum += truncateToDecimals(Number(event.target.value))
            tipTotalElement.textContent = truncateToDecimals(tipSum).toFixed(2)
            this.blur()
        }
    })
    element.addEventListener('blur', function (event) {
        if(tipVar !== 0) {
            tipSum -= truncateToDecimals(Number(tipVar))
        }
        tipVar = truncateToDecimals(Number(event.target.value))
        tipSum += truncateToDecimals(Number(event.target.value))
        tipTotalElement.textContent = truncateToDecimals(tipSum).toFixed(2)
    })
}





tipInputListener(oldCashTipElement, oldCashTips)
tipInputListener(oldDebitTipElement, oldDebitTips)
tipInputListener(oldCashTakeOutElement, oldCashTakeOut)
tipInputListener(oldDebitTakeOutElement, oldDebitTakeOut)
tipInputListener(newCashTipElement, newCashTips)
tipInputListener(newDebitTipElement, newDebitTips)


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
    additionalFrontOutput = document.getElementById('additionalfronttips')
    additionalKitchenOutput = document.getElementById('additionalkitchentips')
    additionalDishwasherOutput = document.getElementById('additionaldishwashertips')
    // const additionalOutputListener = function (element, tipVar) {
    //     element.addEventListener('keydown', function (event) {
    //         if(event.keyCode === 13) {
    //             if(tipVar !== 0) {
    //                 tipVar = truncateToDecimals(Number(tipVar))
    //             }
    //             tipVar = truncateToDecimals(Number(event.target.value))
    //             console.log(tipVar)
    //             additionalOutput.innerHTML = `Total Tips: $${(earnedTips + tipVar).toFixed(2)}`
    //             this.blur()
    //         }
    //     })
    //     element.addEventListener('blur', function (event) {
    //         if(tipVar !== 0) {
    //             tipVar = truncateToDecimals(Number(tipVar))
    //         }
    //         tipVar = truncateToDecimals(Number(event.target.value))
    //     })
    // }
    output.innerHTML = ''
    additionalFrontOutput.innerHTML = ''
    additionalKitchenOutput.innerHTML = ''
    additionalDishwasherOutput.innerHTML = ''
    
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
        output.innerHTML = `For the front staff: $${earnedTips.toFixed(2)}
                            </br>(Optional) Tips from before: <input type="number" id="optionalfronttips">
                        </br></br>For the cooks: $${cookTipsDivided.toFixed(2)}
                        </br>(Optional) Tips from before: <input type="number" id="optionalkitchentips">`
        const optionalFrontElement = document.getElementById('optionalfronttips')
        const optionalKitchenElement = document.getElementById('optionalkitchentips')
        const optionalDishwasherElement = document.getElementById('optionadishwashertips')
        
        // event listeners for nested input fields, keydown and blur for enter and tabbing away. goal is to allow all day tips to be produced
        optionalFrontElement.addEventListener('keydown', function (event) {
            if(event.keyCode === 13) {
                if(optionalFront !== 0) {
                    optionalFront = truncateToDecimals(Number(optionalFront))
                }
                optionalFront = truncateToDecimals(Number(event.target.value))
                additionalFrontOutput.innerHTML = `All day tips for the Front: $${(earnedTips + optionalFront).toFixed(2)}`
                this.blur()
            }
        })

        optionalFrontElement.addEventListener('blur', function (event) {
            if(optionalFront !== 0) {
                optionalFront = truncateToDecimals(Number(optionalFront))
            }
            optionalFront = truncateToDecimals(Number(event.target.value))
            additionalFrontOutput.innerHTML = `All day tips for the Front: $${(earnedTips + optionalFront).toFixed(2)}`
        })

        optionalKitchenElement.addEventListener('keydown', function (event) {
            if(event.keyCode === 13) {
                if(optionalKitchen !== 0) {
                    optionalKitchen = truncateToDecimals(Number(optionalKitchen))
                }
                optionalKitchen = truncateToDecimals(Number(event.target.value))
                additionalKitchenOutput.innerHTML = `All day tips for the Kitchen: $${(cookTipsDivided + optionalKitchen).toFixed(2)}`
                this.blur()
            }
        })

        optionalKitchenElement.addEventListener('blur', function (event) {
            if(optionalKitchen !== 0) {
                optionalKitchen = truncateToDecimals(Number(optionalKitchen))
            }
            optionalKitchen = truncateToDecimals(Number(event.target.value))
            additionalKitchenOutput.innerHTML = `All day tips for the Kitchen: $${(cookTipsDivided + optionalKitchen).toFixed(2)}`
        })

        // additionalOutputListener(optionalFrontElement, optionalFront)
        // additionalOutputListener(optionalKitchenElement, optionalKitchen)
        // additionalOutputListener(optionalDishwasherElement, optionalDishwasher)
    } else {
        output.innerHTML = `For the front staff: $${earnedTips.toFixed(2)}
                            </br>(Optional) Tips from before: <input type="number" id="optionalfronttips">
                        </br></br>For the cooks: $${cookTipsDivided.toFixed(2)}
                        </br>(Optional) Tips from before: <input type="number" id="optionalkitchentips">
                        </br></br>For the dishwashers: $${(dishTipOutNet / dishwasher).toFixed(2)}
                        </br>(Optional) Tips from before: <input type="number" id="optionaldishwashertips">`
        const optionalFrontElement = document.getElementById('optionalfronttips')
        const optionalKitchenElement = document.getElementById('optionalkitchentips')
        const optionalDishwasherElement = document.getElementById('optionaldishwashertips')

         // event listeners for nested input fields, keydown and blur for enter and tabbing away. goal is to allow all day tips to be produced
         optionalFrontElement.addEventListener('keydown', function (event) {
            if(event.keyCode === 13) {
                if(optionalFront !== 0) {
                    optionalFront = truncateToDecimals(Number(optionalFront))
                }
                optionalFront = truncateToDecimals(Number(event.target.value))
                additionalFrontOutput.innerHTML = `All day tips for the Front: $${(earnedTips + optionalFront).toFixed(2)}`
                this.blur()
            }
        })

        optionalFrontElement.addEventListener('blur', function (event) {
            if(optionalFront !== 0) {
                optionalFront = truncateToDecimals(Number(optionalFront))
            }
            optionalFront = truncateToDecimals(Number(event.target.value))
            additionalFrontOutput.innerHTML = `All day tips for the Front: $${(earnedTips + optionalFront).toFixed(2)}`
        })

        optionalKitchenElement.addEventListener('keydown', function (event) {
            if(event.keyCode === 13) {
                if(optionalKitchen !== 0) {
                    optionalKitchen = truncateToDecimals(Number(optionalKitchen))
                }
                optionalKitchen = truncateToDecimals(Number(event.target.value))
                additionalKitchenOutput.innerHTML = `All day tips for the Kitchen: $${(cookTipsDivided + optionalKitchen).toFixed(2)}`
                this.blur()
            }
        })

        optionalKitchenElement.addEventListener('blur', function (event) {
            if(optionalKitchen !== 0) {
                optionalKitchen = truncateToDecimals(Number(optionalKitchen))
            }
            optionalKitchen = truncateToDecimals(Number(event.target.value))
            additionalKitchenOutput.innerHTML = `All day tips for the Kitchen: $${(cookTipsDivided + optionalKitchen).toFixed(2)}`
        })

        optionalDishwasherElement.addEventListener('keydown', function (event) {
            if(event.keyCode === 13) {
                if(optionalDishwasher !== 0) {
                    optionalDishwasher = truncateToDecimals(Number(optionalDishwasher))
                }
                optionalDishwasher = truncateToDecimals(Number(event.target.value))
                additionalDishwasherOutput.innerHTML = `All day tips for the Dishwashers: $${((dishTipOutNet / dishwasher) + optionalDishwasher).toFixed(2)}`
                this.blur()
            }
        })

        optionalDishwasherElement.addEventListener('blur', function (event) {
            if(optionalDishwasher !== 0) {
                optionalDishwasher = truncateToDecimals(Number(optionalDishwasher))
            }
            optionalDishwasher = truncateToDecimals(Number(event.target.value))
            additionalDishwasherOutput.innerHTML = `All day tips for the Dishwashers: $${((dishTipOutNet / dishwasher) + optionalDishwasher).toFixed(2)}`
        })
    }
})



