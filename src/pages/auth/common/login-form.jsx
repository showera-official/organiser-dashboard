import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import axios from "./axios";
import Loading from "@/components/Loading";
import Cookies from "js-cookie";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup
  .object({
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  function handleChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  // const navigate = useNavigate();
  // const onSubmit = (data) => {
    
  //   if (user) {
  //     dispatch(handleLogin(true));
  //     setTimeout(() => {
  //       navigate("/dashboard");
  //     }, 1500);
  //   } else {
  //     toast.error("Invalid credentials", {
  //       position: "top-right",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };

  const [checked, setChecked] = useState(false);
  const handleSignIn = (e) => {
    console.log(formData);
    e.preventDefault();
    setLoading(true);

    setIsSubmitting(true);

    if (!formData.phone || !formData.password) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please fill all the fields");
    }

    if (!formData.phone) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please enter a phone number");
    }

    if (formData.phone.length != 10) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please enter a valid phone number");
    }
    if (!formData.phone.match(/^[0-9]{10}$/)) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please enter a valid phone number");
    }

    //  password should be no only 4 digits
    // passwrod regex only numbers
    const passwordRegex = /^(?=.*\d)[\d ]+$/;
    if (!passwordRegex.test(formData.password)) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Password should be only numbers");
    }

    axios
      .post("/auth/login", {
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
        comparepasword: formData.comparepassword,
        
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        Cookies.set("token", res.data.token, { expires: 7 });
        Cookies.set("data", res.data);
        setIsSubmitting(false);
        toast.success(res.data.message);

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        setIsSubmitting(false);

        toast.error(err.response.data.message);
      });
  };
  return loading?(<Loading/>):(
    <form onSubmit={handleSubmit} className="space-y-4 ">
        <Textinput
          name="phone"
          label="phone"
          type="number"
          onChange={handleChange}
          placeholder="Enter Phone Number"
          register={register}
          error={errors.phone}
        />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        onChange={handleChange}
        // defaultValue={users[0].password}
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center" onClick={handleSignIn}>Sign in</button>
    </form>
  );
};

export default LoginForm;
