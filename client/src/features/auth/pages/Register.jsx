import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../../components/layout/AuthLayout";
import Card from "../../../shared/components/Card";
import Input from "../../../shared/components/Input";
import { showError } from "@/lib/toast";
import Button from "../../../shared/components/Button";
import { registerUser } from "../services/authService";
import { Shield } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
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
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      showError(err.response?.data?.message || "Registration Failed");
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
            Create <span className="text-indigo-400">Account</span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Start your self-improvement RPG journey today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Character Name"
            name="name"
            placeholder="e.g. Alex"
            value={form.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="alex@projectme.com"
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
            {loading ? "Creating Character..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-8 text-center pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-indigo-400 hover:text-indigo-300">
              Log In
            </Link>
          </p>
        </div>
      </Card>
    </AuthLayout>
  );
}

export default Register;