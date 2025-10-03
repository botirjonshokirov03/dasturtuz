import Calculator from "@/components/Calculator";
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export default function About(){
    const name = "Fayzullo";
    const surname = "Nematov";

    return(
        <>
        <Navbar name={name} surname={surname} age={18}/>
        <h1>This is About Page</h1>
        <Calculator firsNumber={10} secondNumber={25}/>
        <Calculator firsNumber={15} secondNumber={30}/>
        <Calculator firsNumber={20} secondNumber={35}/>
        <Footer />
        </>
    )
}