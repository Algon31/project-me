import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../../components/layout/AuthLayout";

import Card from "../../../shared/components/Card";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import { showError } from "@/lib/toast";
import { loginUser } from "../services/authService";
import { useAuth } from "../../../context/AuthContext";

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

            <Card>

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-[var(--pcolor)]">
                        Project : ME
                    </h1>

                    <p className="mt-3 text-[var(--muted)]">
                        Become 1% Better Every Day.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>

                </form>

                <div className="mt-8 text-center">

                    <p className="text-sm text-[var(--muted)]">

                        Don't have an account?

                    </p>

                    <Link
                        to="/register"
                        className="font-semibold text-[var(--pcolor)]"
                    >
                        Create Account
                    </Link>

                </div>

            </Card>

        </AuthLayout>
    );
}

export default Login;