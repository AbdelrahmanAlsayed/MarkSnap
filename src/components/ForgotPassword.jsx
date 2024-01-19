import { Link } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import { useRef, useState } from "react";


function ForgotPassword() {
    const emailRef = useRef();
    const { reset } = useAuth();
    const [error, setError] = useState("");
    const [successMsg, setsuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        if (!emailRef.current.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            return setError("Invalid email address. Please enter a valid email.");
        }
        try {
            setError("");
            setsuccessMsg("Reset email sent to your account. Check it to get new password");
            setLoading(true);
            await reset(emailRef.current.value);
            // setTimeout(() => {
            //     navigate("/signin");
            // }, 2000);
        } catch (error) {
            setError("Cannot reset password now, try again later");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen w-full flex-col md:flex-row ">
            <div className="bg-mainBg flex-1 md:rounded-r-3xl rounded-b-3xl  md:rounded-bl-none">
                <div className="container pt-10 text-mainColor h-screen text-center flex justify-around items-center flex-col ">
                    <div className="flex flex-col gap-y-6 md:gap-y-10">
                        <h1 className="logo mb-8">MarkSnap</h1>
                        <h1 className="leading-relaxed text-xl tracking-wide italic">
                            Hello 👋, Welcome to MarkSnap, where documenting becomes a breeze.
                            Explore our features.
                        </h1>
                        <p className="leading-relaxed text-lg tracking-wide italic">
                            Write your content in Markdown, effortlessly convert it to text,
                            then download it as a Markdown or PDF file with MarkSnap. Sign In now !
                        </p>
                    </div>
                    <div className="flex flex-col gap-y-5 md:hidden">
                        <a href="#loginForm" className="py-3.5 px-24 rounded-3xl cursor-pointer tracking-wide bg-[#6366f1] text-mainColor hover:bg-[#6365f1d8] font-bold">Sign In</a>
                    </div>
                </div>
            </div>
            <div className="bg-secBg flex-1" id="loginForm">
                <div className="container text-mainBg h-screen flex justify-center items-center flex-col">
                    <h1 className="tracking-wide font-bold text-3xl md:text-3.5xl italic pb-12">Reset your Password</h1>
                    {error && <h2 className="bg-[#f8d7da] text-[#842029] w-full text-center mb-5 p-3 rounded-lg">{error}</h2>}
                    {successMsg && <h2 className="bg-[#d1e7dd] text-[#0f5132] w-full text-center mb-5 p-3 rounded-lg">{successMsg}</h2>}
                    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter your Email address" ref={emailRef} />

                        <Link to="/signin" className="text-[#6366f1] underline font-bold text-sm">
                            Login
                        </Link>
                        <input type="submit" value="Reset" className="mt-3 tracking-wide cursor-pointer bg-mainBg text-secBg hover:bg-[#0f172ae3]" disabled={loading} />
                        <div className="text-sm">
                            Need an Account ?
                            <Link className="underline text-[#6366f1] font-bold" to="/signup"> Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;

