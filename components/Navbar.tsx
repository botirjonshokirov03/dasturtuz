type NavbarProps ={
    name: string;
    surname: string;
    age: number
}

export default function Navbar({name, surname, age}: NavbarProps){
    return(
        <>
        <h1>This is Navbar</h1>
        <span>My name is {name}, my surname is {surname}, my age is {age}</span>
        </>
    )
}