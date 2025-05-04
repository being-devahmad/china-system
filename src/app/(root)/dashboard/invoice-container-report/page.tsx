// app/dashboard/invoice-container/page.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function InvoiceContainerPage() {


    const containerInfo = {
        containerNo: "28",
        loadingDate: "2024/7/30",
        totalCtn: "650",
        pageNo: "1",
    };

    const data = [
        {
            shop: "MARY",
            bill: "B",
            ctn: "1 - 18",
            item: "B.PIN",
            tCtn: 18,
            qunty: "720 × CA",
            price: "2.60",
            total: "33696",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "B",
            ctn: "19 - 26",
            item: "B.PIN",
            tCtn: 8,
            qunty: "200 × 12",
            price: "1.15",
            total: "22080",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "B",
            ctn: "27 - 31",
            item: "CHUTKI",
            tCtn: 5,
            qunty: "60 × 12",
            price: "1.80",
            total: "6480",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "B",
            ctn: "32 - 45",
            item: "B.PIN",
            tCtn: 14,
            qunty: "200 × 12",
            price: "0.63",
            total: "21168",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "B",
            ctn: "46 - 48",
            item: "B.PIN",
            tCtn: 3,
            qunty: "200 × 12",
            price: "0.65",
            total: "4680",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "B",
            ctn: "49 - 53",
            item: "B.PIN",
            tCtn: 5,
            qunty: "200 × 12",
            price: "0.65",
            total: "7800",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "B",
            ctn: "54 - 54",
            item: "B.PIN",
            tCtn: 1,
            qunty: "684 × 1",
            price: "2.35",
            total: "1607.4",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "B",
            ctn: "55 - 54",
            item: "B.PIN",
            tCtn: 1,
            qunty: "36 × 1",
            price: "1.41",
            total: "50.76",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "B",
            ctn: "55 - 59",
            item: "B.PIN",
            tCtn: 5,
            qunty: "200 × 12",
            price: "0.69",
            total: "8280",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "B",
            ctn: "60 - 61",
            item: "B.PIN",
            tCtn: 2,
            qunty: "190 × 12",
            price: "1.60",
            total: "7296",
            gtotal: "",
        },
        {
            shop: "4962",
            bill: "C",
            ctn: "1",
            item: "E.RING",
            tCtn: 1,
            qunty: "95 × 12",
            price: "2.80",
            total: "3192",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "C",
            ctn: "2",
            item: "E.RING+S.B",
            tCtn: 1,
            qunty: "50 × 12",
            price: "5.30",
            total: "3180",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "C",
            ctn: "3",
            item: "MALA",
            tCtn: 1,
            qunty: "42 × 12",
            price: "8.00",
            total: "4032",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "C",
            ctn: "4",
            item: "E.RING+S.B",
            tCtn: 1,
            qunty: "43 × 12",
            price: "5.00",
            total: "2580",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "C",
            ctn: "5",
            item: "E.RING+S.B",
            tCtn: 1,
            qunty: "41 × 12",
            price: "3.00",
            total: "1476",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "C",
            ctn: "6",
            item: "MALA",
            tCtn: 1,
            qunty: "42 × 12",
            price: "8.00",
            total: "4032",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "C",
            ctn: "7",
            item: "E.RING+S.B",
            tCtn: 1,
            qunty: "42 × 12",
            price: "4.80",
            total: "2419.2",
            gtotal: "",
        },
        {
            shop: "..",
            bill: "C",
            ctn: "8",
            item: "E.RING+S.B",
            tCtn: 1,
            qunty: "42 × 12",
            price: "4.80",
            total: "2419.2",
            gtotal: "50488.8",
        },
    ];

    return (
        <div className="p-4 space-y-4">
            <Card>
                <CardContent className="flex flex-wrap justify-between text-center gap-4 py-4">
                    <div>
                        <h4 className="font-semibold">CONTAINER NO.</h4>
                        <p>{containerInfo.containerNo}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">LOADING DATE</h4>
                        <p>{containerInfo.loadingDate}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">TOTAL CTN</h4>
                        <p>{containerInfo.totalCtn}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Page</h4>
                        <p>{containerInfo.pageNo}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-4 overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SHOP NO.</TableHead>
                                <TableHead>BILL NO.</TableHead>
                                <TableHead>CTN NO.</TableHead>
                                <TableHead>ITEM</TableHead>
                                <TableHead>T.CTN</TableHead>
                                <TableHead>QUNTY</TableHead>
                                <TableHead>PRICE</TableHead>
                                <TableHead>TOTAL</TableHead>
                                <TableHead>G.TOTAL</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.shop}</TableCell>
                                    <TableCell>{row.bill}</TableCell>
                                    <TableCell>{row.ctn}</TableCell>
                                    <TableCell>{row.item}</TableCell>
                                    <TableCell>{row.tCtn}</TableCell>
                                    <TableCell>{row.qunty}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.total}</TableCell>
                                    <TableCell>{row.gtotal}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
