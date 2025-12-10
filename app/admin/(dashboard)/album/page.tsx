"use client";

import { useState, useEffect, FormEvent } from "react";
import AlbumForm from "@/components/admin/album/Form";
import UploadPreview from "@/components/admin/album/UploadPreview";
import { Box, Grid, Tabs, Text, Flex, Badge, Card, Button } from "@radix-ui/themes";
import { UploadIcon, ImageIcon, LayersIcon, ChevronLeftIcon, TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { createAlbum, deleteAlbum, getAllAlbums } from "@/lib/dashboard/album";
import type { FileWithPreview } from "@/types/file";
import Image from "next/image";
import type { AlbumStats } from "@/types/album";
import Swal from "sweetalert2";


export default function AlbumPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("upload");
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [uploading, setUploading] = useState(false);
    const [albums, setAlbums] = useState<AlbumStats[]>([]);

    const handleFilesSelect = (selectedFiles: File[]) => {
        const valid = selectedFiles.filter((f) => f.type.startsWith("image/"));

        const mapped: FileWithPreview[] = valid.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setFiles((prev) => [...prev, ...mapped]);
    };

    const removeFile = (index: number) => {
        setFiles((prev) => {
            URL.revokeObjectURL(prev[index].preview);
            return prev.filter((_, i) => i !== index);
        });
    };

    const clearAllFiles = () => {
        files.forEach((f) => URL.revokeObjectURL(f.preview));
        setFiles([]);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (files.length === 0) {
            alert("Pilih minimal 1 foto");
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();

            files.forEach(({ file }) => {
                formData.append("files", file);
            });

            const result = await createAlbum(formData);
            console.log("✅ Upload success:", result);

            clearAllFiles();
        } catch (err) {
            console.error(err);
            alert("Upload gagal");
        } finally {
            setUploading(false);
        }
    };

    const getAlbums = async () => {
        const result = await getAllAlbums();
        setAlbums(result);
    };

    const handleDeleteAlbum = async (albumId: string) => {
        try {
            await deleteAlbum(albumId);

            Swal.fire({
                title: "Terhapus!",
                text: "Album berhasil dihapus.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            // ✅ refresh data / hapus dari state
            setAlbums((prev) => prev.filter((a) => a.id !== albumId));
        } catch (error: unknown) {
            Swal.fire({
                title: "Error",
                text: "Gagal menghapus album",
                icon: "error",
            });
        }
    };


    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    return (
        <Box>
            <Flex justify="between" align="center" mb="5">
                <Flex align="center" gap="3">
                    <Button variant="ghost" onClick={() => router.back()} size="2">
                        <ChevronLeftIcon />
                        Kembali
                    </Button>
                    <Box>
                        <Text size="7" weight="bold">Album Manager</Text>
                    </Box>
                </Flex>
                <Badge color="blue" size="2" variant="soft">
                    <LayersIcon />
                    {albums.length} Album
                </Badge>
            </Flex>

            <Tabs.Root value={activeTab} onValueChange={(val) => {
                setActiveTab(val);
                if (val === "all") {
                    getAlbums();
                }
            }}>
                <Tabs.List mb="4">
                    <Tabs.Trigger value="upload">
                        <UploadIcon />
                        Upload Album Baru
                    </Tabs.Trigger>
                    <Tabs.Trigger value="all">
                        <ImageIcon />
                        Lihat Album
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="upload">
                    <Grid columns={{ initial: "1", lg: "2" }} gap="5">
                        <AlbumForm
                            onFilesSelect={handleFilesSelect}
                            uploading={uploading}
                            onSubmit={handleSubmit}
                        />

                        <UploadPreview
                            files={files}
                            onRemoveFile={removeFile}
                            onClearAll={clearAllFiles}
                        />
                    </Grid>
                </Tabs.Content>

                <Tabs.Content value="all">
                    <Box>
                        <Flex justify="between" align="center" mb="4">
                            <Text size="4" weight="bold">
                                Album yang Tersimpan
                            </Text>
                            <Text size="2" color="gray">
                                {albums.length} album
                            </Text>
                        </Flex>

                        <Grid columns={{ initial: "1", sm: "2", lg: "3", xl: "4" }} gap="3">
                            {albums.map((album) => (
                                <Card key={album.id} variant="surface">
                                    {/* Gambar Cover */}
                                    <Box
                                        style={{
                                            width: "100%",
                                            aspectRatio: "16/9",
                                            borderRadius: "var(--radius-2)",
                                            overflow: "hidden",
                                            backgroundColor: "var(--gray-3)",
                                            marginBottom: "12px",
                                            position: "relative",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            console.log(`View album: ${album.id}`);
                                        }}
                                    >
                                        <Image
                                            src={album.url}
                                            alt={album.id + 'album'}
                                            fill
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                transition: "transform 0.2s",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "scale(1.05)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "scale(1)";
                                            }}
                                        />
                                    </Box>

                                    {/* Info Album */}
                                    <Flex justify="end" align="center">

                                        <Button
                                            size="1"
                                            variant="ghost"
                                            color="red"
                                            style={{ cursor: "pointer", borderRadius: "var(--radius-2)", border: "1px solid var(--red-5)", backgroundColor: "var(--red-3)" }}
                                            title="Hapus album"
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                Swal.fire({
                                                    title: "Yakin hapus album?",
                                                    text: "Album ini akan dihapus permanen",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#d33",
                                                    cancelButtonText: "Batal",
                                                    confirmButtonText: "Ya, hapus",
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        handleDeleteAlbum(String(album.id));
                                                    }
                                                });
                                            }}
                                        >
                                            <TrashIcon width="24" height="24" />
                                        </Button>
                                    </Flex>
                                </Card>
                            ))}
                        </Grid>
                    </Box>
                </Tabs.Content>
            </Tabs.Root>
        </Box>
    );
}