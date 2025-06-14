import { useGetFileText } from "@/hooks/hooks";

export default function FileTextViewer() {
    const { data } = useGetFileText();

    if (data) {
        return (
            <div className="p-4">
                {data.response}
            </div>
        );
    }
    else {
        return (
            <div>
                No file selected.
            </div>
        );
    }
}