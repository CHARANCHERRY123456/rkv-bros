import { toast } from "react-hot-toast";

export function useApiError() {
    const showError = (error) => {
        const message =
            error?.response?.data?.message || error?.message || "Something went wrong";
        toast.error(message);
    };

    return { showError };
}
