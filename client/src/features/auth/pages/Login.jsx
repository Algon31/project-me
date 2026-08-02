import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../../components/layout/AuthLayout";
import Card from "../../../shared/components/Card";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import { showError } from "@/lib/toast";
import { loginUser } from "../services/authService";
import { useAuth } from "../../../context/AuthContext";
import { Shield } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await loginUser(form);
      login(data.user, data.token);
      navigate("/today");
    } catch (err) {
      showError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="border-indigo-500/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3 shadow-lg shadow-indigo-500/10">
            <Shield size={24} />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white">
            PROJECT <span className="text-indigo-400">: ME</span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Become 1% Better Every Day.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="hunter@projectme.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Continue Journey"}
          </Button>
        </form>

        <div className="mt-8 text-center pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            Don't have a character account?{" "}
            <Link to="/register" className="font-bold text-indigo-400 hover:text-indigo-300">
              Create Account
            </Link>
          </p>
        </div>
      </Card>
    </AuthLayout>
  );
}

export default Login;