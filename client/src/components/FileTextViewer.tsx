import { useGetFileText } from "@/hooks/hooks";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function FileTextViewer() {
    const csvToArray = (csvString: string) => {
        return csvString
            .trim()
            .split('\n')
            .map((row: string) => row.split(',').map((value) => value.trim()));
    }
    const { data } = useGetFileText();

    if (data) {
        const text = data.response;
        console.log(csvToArray(text));
        const headers = text.split("\n")[0].split(",").map(header => header.trim());
        return (
            <div className="p-4">
                <Table>
                    <TableCaption>Your prescriptions</TableCaption>
                    <TableHeader>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableHead key={index} className="text-left">
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {text.split("\n").slice(1).map((line, index) => (
                            <TableRow key={index}>
                                {line.split(",").map((value, cellIndex) => (
                                    <TableCell key={cellIndex} className="text-left">
                                        {value.trim()}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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