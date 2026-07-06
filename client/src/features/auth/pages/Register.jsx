import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../../components/layout/AuthLayout";

import Card from "../../../shared/components/Card";
import Input from "../../../shared/components/Input";
import { showError } from "@/lib/toast";
import Button from "../../../shared/components/Button";

import { registerUser } from "../services/authService";

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

            <Card>

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-[var(--pcolor)]">
                        Create Account
                    </h1>

                    <p className="mt-3 text-[var(--muted)]">
                        Start your journey today.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <Input
                        label="Name"
                        name="name"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                    />

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
                        placeholder="Create a password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </Button>

                </form>

                <div className="mt-8 text-center">

                    <p className="text-sm text-[var(--muted)]">
                        Already have an account?
                    </p>

                    <Link
                        to="/login"
                        className="font-semibold text-[var(--pcolor)]"
                    >
                        Login
                    </Link>

                </div>

            </Card>

        </AuthLayout>
    );
}

export default Register;