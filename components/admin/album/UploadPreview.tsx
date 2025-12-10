"use client";

import { Box, Card, Text, Flex, IconButton, Grid, Button } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { FileWithPreview } from "@/types/file";

interface Props {
    files: FileWithPreview[];
    onRemoveFile: (index: number) => void;
    onClearAll: () => void;
}

export default function UploadPreview({ files, onRemoveFile, onClearAll }: Props) {
    if (files.length === 0) {
        return (
            <Card size="3">
                <Flex justify="center" align="center" style={{ height: 300 }}>
                    <Text color="gray">Belum ada gambar</Text>
                </Flex>
            </Card>
        );
    }

    const totalSizeMB = (
        files.reduce((a, f) => a + f.file.size, 0) / 1024 / 1024
    ).toFixed(2);

    return (
        <Card size="3">
            <Flex justify="between" mb="3">
                <Text weight="bold">Preview</Text>
                <Button size="1" color="red" variant="soft" onClick={onClearAll}>
                    Hapus Semua
                </Button>
            </Flex>

            <Grid columns="3" gap="3">
                {files.map(({ file, preview }, index) => (
                    <Box key={index} position="relative">
                        <Box
                            position="relative"
                            style={{ width: "100%", aspectRatio: "1", overflow: "hidden" }}
                        >
                            <Image src={preview} alt={file.name} fill style={{ objectFit: "cover" }} />
                        </Box>

                        <IconButton
                            size="1"
                            color="red"
                            style={{ position: "absolute", top: 4, right: 4 }}
                            onClick={() => onRemoveFile(index)}
                        >
                            <Cross1Icon />
                        </IconButton>

                        <Text size="1">{file.name}</Text>
                        <Text size="1" color="gray">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </Text>
                    </Box>
                ))}
            </Grid>

            <Text mt="3" size="1">
                Total size: {totalSizeMB} MB
            </Text>
        </Card>
    );
}
