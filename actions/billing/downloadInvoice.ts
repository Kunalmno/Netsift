export async function DownloadInvoice(id: string): Promise<string> {
    const res = await fetch("/api/download-invoice", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to download invoice");
    }
  
    const data = await res.json();
    return data.url;
  }
  