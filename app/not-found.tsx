// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>404 - Page Not Found</h1>
            <p style={{ color: "#666", marginTop: "1rem" }}>
                The page you’re looking for doesn’t exist.
            </p>
            <Link
                href="/home"
                style={{
                    marginTop: "2rem",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "var(--gray-9)",
                    color: "white",
                    borderRadius: "8px",
                    textDecoration: "none",
                }}
            >
                Go Back Home
            </Link>
        </div>
    );
}
