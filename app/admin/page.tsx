// app/admin/login/page.tsx
"use client";

import { Box, Container, Flex, Card, Text, TextField, Button, Heading, Strong, Callout } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

const dataUser = {
    name: "Admin",
    email: "admin@code.com",
    secretCode: "123456",
    role: "admin",
};

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [secretCode, setSecretCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, secretCode }),
            });


            if (!res.ok) {
                const data = await res.json();
                console.log("🚀 ~ handleSubmit ~ data:", data)
                throw new Error(data.message);
            }

            router.replace("/admin/dashboard");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Login gagal");
            } else {
                setError("Login gagal");
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <Box minHeight="100vh" style={{ background: "var(--color-background)" }}>
            <Container size="1">
                <Flex direction="column" justify="center" align="center" minHeight="100vh" py="9">
                    <Card size="4" style={{ width: "100%", maxWidth: "420px" }}>
                        <Flex direction="column" gap="5">
                            <Flex direction="column" align="center" gap="2">
                                <Heading size="7">Admin Login</Heading>
                                <Text color="gray">Masuk dengan email dan <Strong>kode rahasia</Strong></Text>
                            </Flex>

                            {error && <Callout.Root color="red"><Callout.Text>{error}</Callout.Text></Callout.Root>}

                            <form onSubmit={handleSubmit} suppressHydrationWarning>
                                <Flex direction="column" gap="4">
                                    <TextField.Root
                                        placeholder="email@contoh.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        type="email"
                                        required
                                    >
                                        <TextField.Slot><EnvelopeClosedIcon /></TextField.Slot>
                                    </TextField.Root>

                                    <TextField.Root
                                        placeholder="Kode rahasia"
                                        value={secretCode}
                                        onChange={e => setSecretCode(e.target.value)}
                                        type="password"
                                        required
                                    >
                                        <TextField.Slot><LockClosedIcon /></TextField.Slot>
                                    </TextField.Root>

                                    <Button type="submit" loading={loading} size="3">
                                        Masuk
                                    </Button>
                                </Flex>
                            </form>
                        </Flex>
                    </Card>
                </Flex>
            </Container>
        </Box>
    );
}