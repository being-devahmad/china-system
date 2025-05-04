'use client';

import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

const containerInfo = {
    ctn: 650,
    kg: 16010,
    containerNo: "28",
    date: "2024/7/30",
    page: 1,
};

const rows = [
    { no: "B", ctn: 66, shop: "MARY", mobile: "15057931319", amount: 121328 },
    { no: "C", ctn: 76, shop: "4962", mobile: "13566719275", amount: 249222 },
    { no: "D", ctn: 74, shop: "4962", mobile: "13566719275", amount: 252285 },
    { no: "E", ctn: 13, shop: "3607", mobile: "15600296826", amount: 13836 },
    { no: "F", ctn: 8, shop: "3607", mobile: "15600296826", amount: 8680 },
    { no: "G", ctn: 22, shop: "3605", mobile: "18329063588", amount: 26084 },
    { no: "H", ctn: 11, shop: "3791", mobile: "18757867778", amount: 18560 },
    { no: "I", ctn: 6, shop: "4084", mobile: "18626894851", amount: 12960 },
    { no: "J", ctn: 1, shop: "3959", mobile: "13454901191", amount: 2256 },
    { no: "K", ctn: 8, shop: "8947", mobile: "13588672430", amount: 9550 },
    { no: "L", ctn: 54, shop: "3858", mobile: "13868964088", amount: 147590 },
    { no: "M", ctn: 43, shop: "ROSE", mobile: "15805791182", amount: 47165 },
    { no: "AA", ctn: 20, shop: "27057", mobile: "18006511862", amount: 7680 },
    { no: "BB", ctn: 50, shop: "25021", mobile: "15267350668", amount: 10080 },
    { no: "CC", ctn: 80, shop: "35407", mobile: "13375792733", amount: 13356 },
    { no: "DD", ctn: 15, shop: "李应九", mobile: "18867561596", amount: 2325 },
    { no: "AB", ctn: 100, shop: "KANG", mobile: "13732442121", amount: 87525 },
    { no: "AC", ctn: 30, shop: "YAO YAO", mobile: "15058672582", amount: 112634 },
    { no: "AD", ctn: 19, shop: "4309", mobile: "15868966748", amount: 64080 },
    { no: "20-I", ctn: 28, shop: "3733", mobile: "13106265177", amount: 20990 },
    { no: "20-V", ctn: 8, shop: "3733", mobile: "13106265177", amount: 2916 },
    { no: "27-N", ctn: 35, shop: "4724", mobile: "15267339575", amount: 71046 },
    { no: "27-P", ctn: 8, shop: "4985", mobile: "13516998288", amount: 22800 },
    { no: "AA", ctn: 5, shop: "27057", mobile: "LOADING", amount: 0 },
    { no: "BB", ctn: 5, shop: "25021", mobile: "LOADING", amount: 0 },
    { no: "CC", ctn: 5, shop: "35407", mobile: "LOADING", amount: 0 },
    { no: "DD", ctn: 5, shop: "李应九", mobile: "LOADING", amount: 0 },
    { no: "FR7", ctn: 9, shop: "FU JIAN RONG", mobile: "LOADING", amount: 0 },
    { no: "FR12", ctn: 4, shop: "FU JIAN RONG", mobile: "LOADING", amount: 0 },
];

const totalAmount = rows.reduce((sum, r) => sum + r.amount, 0);
const totalCtn = rows.reduce((sum, r) => sum + r.ctn, 0);

export default function ContainerReportPage() {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Container Register Report</h1>

            <Card>
                <CardContent className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 text-sm font-medium">
                    <div className="text-green-700">CTN: {containerInfo.ctn}</div>
                    <div className="text-blue-700">KG: {containerInfo.kg}</div>
                    <div className="text-orange-700">Container No: {containerInfo.containerNo}</div>
                    <div>Date: {containerInfo.date}</div>
                    <div>Page: {containerInfo.page}</div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>NO</TableHead>
                                <TableHead>CTN</TableHead>
                                <TableHead>Shop No.</TableHead>
                                <TableHead>Mobile No.</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead>Paid Amount</TableHead>
                                <TableHead>Note</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{row.no}</TableCell>
                                    <TableCell>{row.ctn}</TableCell>
                                    <TableCell>{row.shop}</TableCell>
                                    <TableCell>{row.mobile}</TableCell>
                                    <TableCell>¥ {row.amount.toLocaleString()}</TableCell>
                                    <TableCell className="text-red-500"> </TableCell>
                                    <TableCell> </TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="bg-gray-100 font-semibold">
                                <TableCell className="text-green-700">Total</TableCell>
                                <TableCell className="text-green-700">{totalCtn}</TableCell>
                                <TableCell />
                                <TableCell />
                                <TableCell className="text-blue-700">¥ {totalAmount.toLocaleString()}</TableCell>
                                <TableCell className="text-red-600">0</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
