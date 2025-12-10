const API_URL = "https://backend-ts-lemon.vercel.app";

export async function createAlbum(formData: FormData) {
  const res = await fetch(`${API_URL}/api/album`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Upload gagal");
  }

  return res.json();
}

export async function getAllAlbums() {
  const res = await fetch(`${API_URL}/api/album`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Gagal mengambil data album");
  }

  return res.json();
}

export async function deleteAlbum(albumId: string) {
  const res = await fetch(`${API_URL}/api/album/${albumId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Gagal menghapus album");
  }

  return res.json();
}
