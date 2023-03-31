let output = document.getElementById("output-screen")
let number = document.querySelectorAll(".number")
let clear = document.querySelector("#clear")
let allClear = document.querySelector("#all-clear")
let operator = document.querySelectorAll(".operator")
let plusOperator = document.querySelector("#plus")
let minusOperator = document.querySelector("#minus")
let multiplyOperator = document.querySelector("#multiply")
let divideOperator = document.querySelector("#divide")
let equal = document.querySelector("#equal")
let period = document.querySelector("#period")
let percent = document.querySelector("#percent")
let periodStatus = false;
let buffer = [];
let opList = [];

operator.forEach(element => {
    element.addEventListener("mouseover", () => {
        element.classList.add("hovered")
    })
    element.addEventListener("mouseout", () => {
        element.classList.remove("hovered")
    })
});

period.addEventListener("click", () => {
    if (periodStatus == false) {
        output.value += "."
        periodStatus = true
    }
})

number.forEach(element => {
    element.addEventListener("click", () => {
        if (output.value == "0") {
            output.value = ""
        }
        output.value += element.innerText
    })
});

percent.addEventListener("click", () => {
    if (output.value != "") {
        output.value = output.value / 100
        if (!Number.isInteger(output.value)) {
            periodStatus = true
        } else {
            periodStatus = false
        }
    }
})

clear.addEventListener("click", () => {
    if (output.value.length == 1) {
        output.value = "0"
    }
    else {
        if (output.value[output.value.length - 1] == ".") {
            periodStatus = false
        }
        output.value = output.value.slice(0, -1)
    }
})

allClear.addEventListener("click", () => {
    output.value = "0"
    buffer.splice(0, buffer.length)
    periodStatus = false
    operator.forEach(element => {
        element.style.color = "white"
    });
})

plusOperator.addEventListener("click", () => {
    if (output.value != "") {
        opList.push("+")
        if (Number.isInteger(output.value)) {
            buffer.push(parseInt(output.value))
        } else {
            buffer.push(parseFloat(output.value))
        }
        output.value = ""
        plusOperator.style.color = "gray"
        periodStatus = false
    }
})

minusOperator.addEventListener("click", () => {
    if (output.value != "") {
        opList.push("-")
        if (Number.isInteger(output.value)) {
            buffer.push(parseInt(output.value))
        } else {
            buffer.push(parseFloat(output.value))
        }
        output.value = ""
        minusOperator.style.color = "gray"
        periodStatus = false
    }
})

multiplyOperator.addEventListener("click", () => {
    if (output.value != "") {
        opList.push("*")
        if (Number.isInteger(output.value)) {
            buffer.push(parseInt(output.value))
        } else {
            buffer.push(parseFloat(output.value))
        }
        output.value = ""
        multiplyOperator.style.color = "gray"
        periodStatus = false
    }
})

divideOperator.addEventListener("click", () => {
    if (output.value != "") {
        opList.push("/")
        if (Number.isInteger(output.value)) {
            buffer.push(parseInt(output.value))
        } else {
            buffer.push(parseFloat(output.value))
        }
        output.value = ""
        divideOperator.style.color = "gray"
        periodStatus = false
    }
})

equal.addEventListener("click", () => {
    if (output.value == "") {
        console.log("Invalid");
    }
    else if (opList.length != 0) {
        if (Number.isInteger(output.value)) {
            buffer.push(parseInt(output.value))
        } else {
            buffer.push(parseFloat(output.value))
        }

        while (opList.length > 0) {
            if (opList[0] == "+") {
                buffer[1] = buffer[0] + buffer[1]
                buffer.shift();
                opList.shift();

            }
            else if (opList[0] == "-") {
                buffer[1] = buffer[0] - buffer[1]
                buffer.shift();
                opList.shift();
            }
            else if (opList[0] == "*") {
                buffer[1] = buffer[0] * buffer[1]
                buffer.shift();
                opList.shift();
            }
            else if (opList[0] == "/") {
                buffer[1] = buffer[0] / buffer[1]
                buffer.shift();
                opList.shift();
            }
        }

        output.value = buffer[0]
        if (!Number.isInteger(buffer[0])) {
            periodStatus = true
        } else {
            periodStatus = false
        }
        buffer.shift()

        operator.forEach(element => {
            element.style.color = "white"
        });
    }
})