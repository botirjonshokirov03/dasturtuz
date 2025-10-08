import Calculator from "@/components/Calculator";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <h1>This is About Page</h1>
      <Calculator firsNumber={10} secondNumber={25} />
      <Calculator firsNumber={15} secondNumber={30} />
      <Calculator firsNumber={20} secondNumber={35} />
      <Footer />
    </>
  );
}
