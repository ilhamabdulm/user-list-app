import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AppLogo from "@/assets/images/app-logo.svg";
import Button from "@/components/elements/button";
import Input from "@/components/elements/input";

import { setToken } from "@/utils/storages";
import { postLoginUser } from "@/services/auth";
import useForm from "@/hooks/use-form";

const formData = {
  username: "",
  password: "",
};

const SigninPage = () => {
  const { state, handleFormChange, resetForm } = useForm(formData);

  const navigate = useNavigate();

  const _handleSubmit = async (payload) => {
    try {
      const response = await postLoginUser(payload);
      const token = response.token;
      setToken(token);
      console.log({ response });
      navigate("/users", { replace: true });
      resetForm();
    } catch (err) {
      toast.error(err.error);
    }
  };

  return (
    <>
      <figure>
        <img src={AppLogo} alt="app-logo" width={228} height={84} />
      </figure>
      <h1 className="text-xl font-bold">Frontend Developer Test</h1>
      <div className="bg-white w-full mt-12 px-6 py-8 rounded-lg">
        <form
          className="space-y-6 mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            _handleSubmit(state);
          }}
        >
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            name="email"
            onChange={handleFormChange}
            value={state.email}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter password"
            name="password"
            autoComplete="current-password"
            onChange={handleFormChange}
            value={state.password}
          />

          <footer className="w-full">
            <Button type="submit" variant="primary" size="small" full>
              Login
            </Button>
          </footer>
        </form>
      </div>
    </>
  );
};

export default SigninPage;
