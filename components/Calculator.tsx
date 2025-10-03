type CalculatorProps ={
firsNumber: number;
secondNumber: number
}

export default function Calculator({firsNumber, secondNumber}: CalculatorProps){
    
    const sum = firsNumber + secondNumber;
    const multiple = firsNumber * secondNumber;
    
    return(
        <>
        <h1>Calculator</h1>
        <span> Sum of {firsNumber} and {secondNumber}: {sum}</span>
        <span> Multiplication of {firsNumber} and {secondNumber}: {multiple}</span>
        </>
    )
}