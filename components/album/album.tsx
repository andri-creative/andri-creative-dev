'use client'

import { Card } from "@radix-ui/themes";
import { RowsPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/rows.css";
import { useState } from "react";
import type { AlbumStats } from "@/types/album"

interface AlbumProms {
    myAlbum: AlbumStats[]
}

export default function Album({ myAlbum }: AlbumProms) {

    const [lightboxIndex, setLightboxIndex] = useState(-1);

    const photos = [...myAlbum]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((item) => ({
            src: item.url,
            width: item.width,
            height: item.height,
            alt: item.id + ' my album',
            key: item.id,
        }));


    return (
        <Card>
            <RowsPhotoAlbum
                photos={photos}
                spacing={10}
                targetRowHeight={250}
                onClick={({ index }) => setLightboxIndex(index)}
            />

            <Lightbox
                open={lightboxIndex >= 0}
                index={lightboxIndex}
                slides={photos}
                close={() => setLightboxIndex(-1)}
            />
        </Card>
    )
}