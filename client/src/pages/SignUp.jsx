import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "react-lottie";
import loading_anim from "../animations/loading_anim.json";
import error_anim from "../animations/error_anim.json";
import success_anim from "../animations/success_anim.json";

const SignUp = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { VITE_URL } = import.meta.env;
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${VITE_URL}/auth/signup`, formData);
      setLoading(false);
      if (response.data) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      }
      console.log("Response:", response.data);
    } catch (error) {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        formRef.current.reset();
        setLoading(false);
        setSuccess(false);
        setError(false);
      }, 1500);
      console.error("Error:", error);
    }
  };

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loading_anim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const errorOptions = {
    loop: false,
    autoplay: true,
    animationData: error_anim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const successOptions = {
    loop: false,
    autoplay: true,
    animationData: success_anim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="max-w-lg p-3 mx-auto">
      <h1 className="my-4 text-3xl font-semibold text-center">SIGN UP</h1>
      <form
        ref={formRef}
        className="flex flex-col gap-4 mb-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username"></label>
        <input
          type="text"
          placeholder="Username"
          className="p-3 border rounded-lg"
          id="username"
          required
          onChange={handleChange}
        />
        <label htmlFor="email"></label>
        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded-lg"
          id="email"
          required
          onChange={handleChange}
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded-lg"
          id="password"
          required
          onChange={handleChange}
        />
        <button
          className="h-[54px] p-3 mt-4 flex items-center justify-center text-white rounded-lg bg-slate-700 hover:opacity-90 disabled:opacity-70"
          type="submit"
          disabled={loading || error || success}
        >
          {loading && (
            <Lottie options={loadingOptions} height={50} width={50} />
          )}
          {error && <Lottie options={errorOptions} height={50} width={50} />}
          {success && (
            <Lottie options={successOptions} height={50} width={50} />
          )}
          {!loading && !error && !success && "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </section>
  );
};
export default SignUp;
