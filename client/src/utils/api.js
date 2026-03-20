

export default async function get(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(response.status);
        }

        let result;

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            result = await response.json();
        } else {
            result = await response.text();
        }

        return result;

    } catch (error) {
        throw error;
    }
}


