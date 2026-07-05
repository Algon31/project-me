function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">

            <div className="w-full max-w-md">

                {children}

            </div>

        </div>
    );
}

export default AuthLayout;