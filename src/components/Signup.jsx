import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import { useRef, useState } from "react";

function Signup() {
    const nameRef = useRef("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    async function handleSubmit(event) {
        event.preventDefault();
        if (!emailRef.current.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            return setError("Invalid email address. Please enter a valid email.");
        }
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords don't match !");
        }
        if (passwordRef.current.value.length < 6 || passwordConfirmRef.current.value.length < 6) {
            return setError("Password must be at least 6 characters!");
        }
        if (nameRef.current.value == "") {
            return setError("Name is not valid");
        }
        if (nameRef.current) {
            localStorage.setItem("currentName", nameRef.current.value);
        }
        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/signin");
        } catch (error) {
            setError("Failed to create an account !");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="flex h-screen w-full flex-col md:flex-row ">
            <div className="bg-mainBg flex-1  md:rounded-r-3xl rounded-b-3xl  md:rounded-bl-none">
                <div className="container pt-10 text-mainColor h-screen text-center flex justify-around items-center flex-col ">
                    <div className="flex flex-col gap-y-6 md:gap-y-10">
                        <h1 className="logo mb-8">MarkSnap</h1>
                        <h1 className="leading-relaxed text-xl tracking-wide italic">
                            Hello 👋, Welcome to MarkSnap, where documenting becomes a breeze.
                            Explore our features.
                        </h1>
                        <p className="leading-relaxed text-lg tracking-wide italic">
                            Write your content in Markdown, effortlessly convert it to text,
                            then download it as a Markdown or PDF file with MarkSnap. Sign up now !
                        </p>
                    </div>
                    <div className="flex flex-col gap-y-5 md:hidden">
                        <a href="#loginForm" className="py-3.5 px-24 rounded-3xl cursor-pointer tracking-wide bg-[#6366f1] text-mainColor hover:bg-[#6365f1d8] font-bold">Sign up</a>
                    </div>
                </div>
            </div>
            <div className="bg-secBg flex-1" id="loginForm">
                <div className="container text-mainBg h-screen flex justify-center items-center flex-col">
                    <h1 className="tracking-wide font-bold text-3xl md:text-3.5xl italic pb-12">Create your Account</h1>
                    {error && <h2 className="bg-[#f8d7da] text-[#842029] w-full text-center mb-5 p-3 rounded-lg">{error}</h2>}
                    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter your name" ref={nameRef} required autoComplete="off" />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter your Email address" ref={emailRef} required autoComplete="off" />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter your password" ref={passwordRef} required autoComplete="off" />
                        <label htmlFor="papasswordConfirm">Confirm Password</label>
                        <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirm your password" ref={passwordConfirmRef} required autoComplete="off" />
                        <div className="flex gap-x-2">
                            <input type="checkbox" id="terms" name="terms" className="m-0 accent-mainBg" required />
                            <label htmlFor="terms">I agree to the terms & privacy.</label>
                        </div>
                        <input type="submit" value="Sign up" className="mt-6 cursor-pointer	bg-mainBg text-secBg hover:bg-[#0f172ae3]" disabled={loading} />
                        <div className="text-sm">
                            Already have an Account ?
                            <Link className="underline text-[#0A4FB3] font-bold" to="/signin"> Log in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;

