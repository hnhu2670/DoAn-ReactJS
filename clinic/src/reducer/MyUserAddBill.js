import React from 'react'

const MyUserAddBill = (currentState, action) => {
    switch (action.type) {
        case "inc":
            return currentState + action.payload; //ktra tăng bao nhiu
        case "dec":
            return currentState - action.payload; //ktra giam bao nhiu
    }
    return currentState;
}

export default MyUserAddBill