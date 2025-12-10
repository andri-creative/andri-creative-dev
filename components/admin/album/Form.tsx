"use client";

import { ChangeEvent, FormEvent, useRef } from "react";
import { Box, Card, Text, Button, Flex } from "@radix-ui/themes";
import { UploadIcon } from "@radix-ui/react-icons";
import { FaRegFolderOpen } from "react-icons/fa";

interface AlbumFormProps {
    onFilesSelect: (files: File[]) => void;
    uploading: boolean;
    onSubmit: (e: FormEvent) => void;
}

export default function AlbumForm({
    onFilesSelect,
    uploading,
    onSubmit,
}: AlbumFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);
        onFilesSelect(selectedFiles);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <Card size="3">
            <Box p="6">
                <Text size="5" weight="bold" mb="6" align="center">
                    Upload Album Baru
                </Text>

                <form onSubmit={onSubmit}>
                    {/* === AREA UPLOAD YANG CANTIK === */}
                    <Box
                        mb="6"
                        p="8"
                        style={{
                            border: "2px dashed var(--gray-6)",
                            borderRadius: "var(--radius-3)",
                            backgroundColor: "var(--color-background)",
                            textAlign: "center",
                        }}
                    >
                        <Box mb="5">
                            <Flex justify="center" align="center">
                                <FaRegFolderOpen size={80} color="var(--blue-9)" />
                            </Flex>
                        </Box>

                        <Text size="4" weight="medium" color="gray" mb="4">
                            Click the button below to upload your files.
                        </Text>

                        <Flex align="center" justify="center" my="4">
                            <Box
                                style={{
                                    flex: 1,
                                    height: "1px",
                                    backgroundColor: "var(--gray-6)",
                                }}
                            />
                            <Text size="2" mx="3" color="gray">
                                OR
                            </Text>
                            <Box
                                style={{
                                    flex: 1,
                                    height: "1px",
                                    backgroundColor: "var(--gray-6)",
                                }}
                            />
                        </Flex>

                        <Button
                            type="button"
                            size="3"
                            variant="solid"
                            color="blue"
                            highContrast
                            style={{ minWidth: "180px" }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <UploadIcon />
                            Choose File
                        </Button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileSelect}
                            style={{ display: "none" }}
                        />


                    </Box>

                    {/* === SUBMIT BUTTON === */}
                    <Button
                        type="submit"
                        size="3"
                        loading={uploading}
                        style={{ width: "100%" }}
                        highContrast

                    >
                        {uploading ? "Mengupload Album..." : "Upload Album"}
                    </Button>
                </form>
            </Box>
        </Card>
    );
}