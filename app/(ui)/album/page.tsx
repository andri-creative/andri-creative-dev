
import { Box } from "@radix-ui/themes";
import { getAllDashboard } from "@/lib/gelAllDashboard";
import Album from "@/components/album/album";


export default async function AlbumPage() {

    const data = await getAllDashboard()
    const dataAlmbum = data?.dashboard?.myAlbum || []

    return (
        <Box>
            <Album myAlbum={dataAlmbum} />
        </Box>
    )
}