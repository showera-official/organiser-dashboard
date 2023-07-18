import React from "react";
import { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "./axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Loading from "@/components/Loading";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const FormValidationSchema = yup
  .object({
    password: yup.string().required("Password is Required"),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    name: yup.string().required("Name is Required"),
    confirmpassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")]),
  })
  .required();

export default function RegForm2() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    comparepassword: "",
   });

  function handleChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  let [loading, setLoading] = useState(false);

  const handleSignUp = (e) => {
    console.log(formData);
    e.preventDefault();
    setLoading(true);

    setIsSubmitting(true);

    if (!formData.phone || !formData.password || !formData.name) {
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
    // if (!formData.phone.match(/^[0-9]{10}$/)) {
    //   setLoading(false);
    //   setIsSubmitting(false);
    //   return toast.error("Please enter a valid phone number");
    // }

    //  password should be no only 4 digits
    // passwrod regex only numbers
    const passwordRegex = /^(?=.*\d)[\d ]+$/;
    if (!passwordRegex.test(formData.password)) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Password should be only numbers");
    }

    axios
      .post("/auth/register", {
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
        comparepasword: formData.comparepassword,
        
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setIsSubmitting(false);
        toast.success(res.data.message);

        setTimeout(() => {
          window.location.href = "/register3";
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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 "
      >
        <Textinput
          name="name"
          label="name"
          type="text"
          onChange={handleChange}
          placeholder={"Enter Your Name"}
          register={register}
          error={errors.username}
        />
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
          label="password"
          type="password"
          onChange={handleChange}
          register={register}
          placeholder="Password"
          error={errors.password}
        />

        <Textinput
          name="comparepassword"
          label="confirm password"
          placeholder="Confirm Password"
          onChange={handleChange}
          type="password"
          register={register}
          error={errors.confirmpassword}
        />

        <div className="lg:col-span-2 col-span-1">
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center" onClick={handleSignUp}>Submit</button>
          </div>
        </div>
      </form>
    </>
  )
}
