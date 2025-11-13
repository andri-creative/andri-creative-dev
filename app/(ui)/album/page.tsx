'use client'

import { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "react-photo-album/rows.css";
import { Box, Card } from "@radix-ui/themes";
import { useAppContext } from "@/app/contexts/AppContext";
import "yet-another-react-lightbox/styles.css";

export default function AlbumPage() {
    const { myAlbum, myAlbumLoading } = useAppContext();
    const [lightboxIndex, setLightboxIndex] = useState(-1);
    console.log('myAlbumLoading:', myAlbumLoading);

    const photos = myAlbum.map((item) => ({
        src: item.url,
        width: item.width,
        height: item.height,
        alt: item.id + ' my album',
        key: item.id,
    }));

    // console.log(myAlbum);

    return (
        <Box>
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
        </Box>
    )
}