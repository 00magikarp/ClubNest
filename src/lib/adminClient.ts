export async function readAdminKey(): Promise<string> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAdminKey`);
    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch (err) {
        console.error("Failed to parse JSON:", text, err);
        throw new Error("Invalid JSON response from /api/readClubs");
    }
}
