import Link from "next/link";


const Navbar = () => {
    return (
        <div className="">
            <ul className="flex gap-4 items-center p-4 ">
            <div>
                <Link href="/"><li>Home</li></Link>
            </div>
            <div>
                <Link href="/dashboard"><li>Dashboard</li></Link>
            </div>
            <div>
                <Link href="/login"><li>Login</li></Link>
            </div>
            <div>
                <Link href="/register"><li>Register</li></Link>
            </div>
            </ul>
            
        </div>
    );
}

export  default Navbar;
