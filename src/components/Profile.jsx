import { useNavigate } from "react-router";
import { useAuth } from "../context/AppContext";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


function Profile() {
    let name = localStorage.getItem("currentName");
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { user, logOut, updateUserEmail, updateUserPassword } = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate("/signin", { replace: true });
        }
        catch {
            setError("Faild to log out");
        }
    }

    const handleCancel = () => {
        navigate("/");
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords don't match!");
        }

        if (passwordRef.current.value.length < 6 || passwordConfirmRef.current.value.length < 6) {
            return setError("Password must be at least 6 characters!");
        }

        if (nameRef.current !== localStorage.getItem("currentName")) {
            localStorage.setItem("currentName", nameRef.current.value);
        }

        setLoading(true);
        setError("");

        try {
            if (emailRef.current.value != user.email) {
                await updateUserEmail(emailRef.current.value);
            }
            if (passwordRef.current.value) {
                await updateUserPassword(passwordRef.current.value);
            }
            navigate("/");
        } catch (error) {
            setError("Failed to update account, Try again Later.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="bg-secBg flex-1" id="loginForm">
                <div className="container text-mainBg h-screen flex justify-center items-center flex-col">
                    <Link to="/" className="logo mb-12 hover:text-[#0f1627e3]">MarkSnap</Link>
                    <h1 className="tracking-wide font-bold text-3xl md:text-3.5xl italic pb-12">Update Your Account</h1>
                    {error && <h2 className="bg-[#f8d7da] text-[#842029] w-full text-center mb-5 p-3 rounded-lg">{error}</h2>}
                    <form className="flex flex-col w-full" onSubmit={handleUpdate}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" defaultValue={name} placeholder="Enter your name" ref={nameRef} autoComplete="off" />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" defaultValue={user.email} id="email" placeholder="Enter your Email address" ref={emailRef} autoComplete="off" />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter a new password" ref={passwordRef} autoComplete="off" />
                        <label htmlFor="papasswordConfirm">Confirm Password</label>
                        <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirm your new password" ref={passwordConfirmRef} autoComplete="off" />
                        <input type="submit" value="Update" className="mt-6 cursor-pointer	bg-mainBg text-secBg hover:bg-[#0f172ae3]" disabled={loading} />
                        <input type="button" value="Cancel Update" className=" cursor-pointer	bg-mainBg text-secBg hover:bg-[#0f172ae3]" onClick={handleCancel} />
                        <input type="button" value="Log Out" className=" cursor-pointer	bg-mainBg text-secBg hover:bg-[#0f172ae3]" onClick={handleLogOut} />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Profile;