import { QueryClient } from "react-query";

const errorHandler = (error: unknown) => {
    alert(
        error instanceof Error
            ? error.message
            : "서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요."
    );
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            onError: errorHandler,
        },
    },
});
