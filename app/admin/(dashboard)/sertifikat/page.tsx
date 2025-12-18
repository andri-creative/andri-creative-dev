"use client";

import "@radix-ui/themes/styles.css";

import * as React from "react";
import * as Form from "@radix-ui/react-form";
import * as Separator from "@radix-ui/react-separator";
import * as Label from "@radix-ui/react-label";
import {
    Theme,
    Box,
    Grid,
    Card,
    Text,
    Heading,
    Flex,
    Badge,
    Button,
    TextField,
    TextArea,
} from "@radix-ui/themes";
import Image from "next/image";

export default function SertifikatPage() {
    const [preview, setPreview] = React.useState<string | null>(null);
    const [formData, setFormData] = React.useState({
        title: "",
        issuer: "",
        label: "",
        issueDate: "",
        description: "",
        category: "sertifikat",
        level: "intermediate",
        tags: "",
        status: false,
        pinned: false,
    });

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <Theme appearance="light" accentColor="indigo" radius="large">
            <Box className="min-h-screen p-6">
                <Heading size="6" mb="5">Upload Sertifikat</Heading>

                <Grid columns={{ initial: "1", md: "2" }} gap="5">
                    {/* LEFT: FORM */}
                    <Card size="3">
                        <Form.Root>
                            <Flex direction="column" gap="4">
                                <Box>
                                    <Text as="label" size="2" weight="medium">Judul Sertifikat</Text>
                                    <TextField.Root name="title"
                                        placeholder="Participant in Machine Learning Competition"
                                        value={formData.title}
                                        onChange={handleChange} />
                                </Box>

                                <Box>
                                    <Text as="label" size="2" weight="medium">Penerbit</Text>
                                    <TextField.Root name="issuer"
                                        placeholder="MDP University (Organized by Informatics Study Program / HIMIF)"
                                        value={formData.issuer}
                                        onChange={handleChange} />
                                </Box>

                                <Box>
                                    <Text as="label" size="2" weight="medium">Nomor Sertifikat</Text>

                                    <TextField.Root
                                        name="label"
                                        placeholder="3.0043UMDP/S/V/2025"
                                        value={formData.label}
                                        onChange={handleChange}
                                    />

                                </Box>

                                <Box>
                                    <Text as="label" size="2" weight="medium">Tanggal Terbit</Text>

                                    <TextField.Root
                                        type="date"
                                        name="issueDate"
                                        value={formData.issueDate}
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box>
                                    <Text as="label" size="2" weight="medium">Deskripsi</Text>
                                    <TextArea
                                        name="description"
                                        placeholder="Certificate awarded to Andrianto (Team AREK JATIM)..."
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box>
                                    <Text as="label" size="2" weight="medium">Tags</Text>

                                    <TextField.Root
                                        name="tags"
                                        placeholder="Machine Learning, IFEST 5.0, Competition"
                                        value={formData.tags}
                                        onChange={handleChange}
                                    />

                                </Box>

                                <Box>
                                    <Text as="label" size="2" weight="medium">Upload Sertifikat</Text>
                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                </Box>

                                <Button size="3">Simpan Sertifikat</Button>
                            </Flex>
                        </Form.Root>
                    </Card>

                    {/* RIGHT: PREVIEW */}
                    <Card size="3">
                        <Heading size="4" mb="3">Preview</Heading>
                        <Separator.Root className="h-px bg-gray-200 mb-4" />

                        {preview ? (
                            <Image
                                width={500}
                                height={500}
                                src={preview}
                                alt="Preview Sertifikat"
                                className="w-full rounded-xl mb-4"
                            />
                        ) : (
                            <Text size="2" color="gray" mb="4">
                                Belum ada file diupload
                            </Text>
                        )}

                        <Flex direction="column" gap="1">
                            <Flex gap="2">
                                <Badge>{formData.category}</Badge>
                                <Badge color="indigo">{formData.level}</Badge>
                            </Flex>

                            <Text weight="bold">
                                {formData.title || "Judul Sertifikat"}
                            </Text>
                            <Text color="gray">
                                {formData.issuer || "Penerbit"}
                            </Text>
                            <Text size="2" color="gray">
                                {formData.issueDate || "Tanggal"}
                            </Text>
                            <Text mt="2">
                                {formData.description || "Deskripsi sertifikat akan tampil di sini."}
                            </Text>
                        </Flex>
                    </Card>
                </Grid>
            </Box>
        </Theme >
    );
}
