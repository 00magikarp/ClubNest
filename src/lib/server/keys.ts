export async function getAdminKey() {
    const key = process.env.ADMIN_KEY;
    if (typeof key === undefined) {
        throw new Error('Admin key not found in ENV');
    }
    return key;
}