import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";



export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const [loginDate,setData] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]:value
      }
    })
  }

  const verifyUser = async () => {
    if (loginDate.email == "" || loginDate.password == "") {
        alert("Please enter all the details");
    } else {
        const result = await dispatch(loginUser(loginDate)); 
        // console.log("Login Result:", result); 

        if (result.payload) { 
            navigate(`/user/${result.payload._id}`);
        } else {
            console.log("Error logging in");
        }
    }
    // console.log(loginDate)
   
  }
  return (
    <section className="grid bg-blue-gray-100 text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <form action="#" className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email">
             Your Email
            </label>
            <Input
              onChange={(e) => handleChange(e)}
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              value={loginDate.email}
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 mt-2"
              labelProps={{
                className: "hidden",
              }}
              required={true}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              onChange={(e) => handleChange(e)}
              name="password"
              value={loginDate.password}
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              required={true}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          
          {/* <Link to="/user">
              Login
          </Link> */}

          <Button onClick={() => verifyUser() } color="gray" size="lg" className="mt-6" fullWidth>
            Sign in
          </Button>
    
          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Forgot password
            </Typography>
          </div>
          <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            Sign in with google
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <Link to="/signup" className="font-medium text-gray-900">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

