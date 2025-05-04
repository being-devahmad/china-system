'use client';

import { useState } from 'react';

export default function VoucherPage() {
    const [form, setForm] = useState({
        amount: '',
        mode: 'cheque',
        detail: '',
        creditAccount: 'Cash Account',
        debitCustomer: 'Jheela Food Corner',
        date: '',
        chequeNo: '',
        bank: '',
        city: '',
        chequeDate: '',
    });

    const [vouchers, setVouchers] = useState([
        { id: 1, amount: 4500, debit: 'Jheela Food Corner', credit: 'Cash Account', detail: 'Cash Received testing', mode: 'cash' },
        { id: 2, amount: 7800, debit: 'Jheela Food Corner', credit: 'Cash Account', detail: '', mode: 'cheque' },
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const addVoucher = () => {
        setVouchers(prev => [
            ...prev,
            {
                id: prev.length + 1,
                amount: Number(form.amount),
                debit: form.debitCustomer,
                credit: form.creditAccount,
                detail: form.detail,
                mode: form.mode,
            },
        ]);
        setForm({
            amount: '',
            mode: 'cheque',
            detail: '',
            creditAccount: 'Cash Account',
            debitCustomer: 'Jheela Food Corner',
            date: '',
            chequeNo: '',
            bank: '',
            city: '',
            chequeDate: '',
        });
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Receivable Voucher</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Amount:</label>
                        <input name="amount" value={form.amount} onChange={handleChange} className="w-full border rounded px-3 py-2" type="number" />
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Mode:</label>
                        <div className="flex gap-4">
                            {['cash', 'cheque', 'online', 'others'].map(mode => (
                                <label key={mode} className="flex items-center gap-2">
                                    <input type="radio" name="mode" value={mode} checked={form.mode === mode} onChange={handleChange} />
                                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Detail:</label>
                        <input name="detail" value={form.detail} onChange={handleChange} className="w-full border rounded px-3 py-2" type="text" placeholder="Cash Received" />
                    </div>

                    <div className="mb-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block font-semibold mb-1">CREDIT Account: Admin</label>
                                <select name="creditAccount" value={form.creditAccount} onChange={handleChange} className="w-full border rounded px-3 py-2">
                                    <option value="Cash Account">Cash Account</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block font-semibold mb-1">DEBIT: Customer</label>
                                <select name="debitCustomer" value={form.debitCustomer} onChange={handleChange} className="w-full border rounded px-3 py-2">
                                    <option value="Jheela Food Corner">Jheela Food Corner - Bill to Bill</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-1">Date:</label>
                            <input name="date" value={form.date} onChange={handleChange} className="w-full border rounded px-3 py-2" type="date" />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Cheque No:</label>
                            <input name="chequeNo" value={form.chequeNo} onChange={handleChange} className="w-full border rounded px-3 py-2" type="text" />
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-1">Bank:</label>
                            <input name="bank" value={form.bank} onChange={handleChange} className="w-full border rounded px-3 py-2" type="text" />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">City:</label>
                            <input name="city" value={form.city} onChange={handleChange} className="w-full border rounded px-3 py-2" type="text" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block font-semibold mb-1">Cheque Date:</label>
                        <input name="chequeDate" value={form.chequeDate} onChange={handleChange} className="w-full border rounded px-3 py-2" type="date" />
                    </div>

                    <button onClick={addVoucher} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                        Add Receivable Voucher
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-2">ID</th>
                                    <th className="text-left p-2">Amount</th>
                                    <th className="text-left p-2">Debit</th>
                                    <th className="text-left p-2">Credit</th>
                                    <th className="text-left p-2">Detail</th>
                                    <th className="text-left p-2">Mode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vouchers.map(voucher => (
                                    <tr key={voucher.id} className="border-b">
                                        <td className="p-2">{voucher.id}</td>
                                        <td className="p-2">{voucher.amount}</td>
                                        <td className="p-2">{voucher.debit}</td>
                                        <td className="p-2">{voucher.credit}</td>
                                        <td className="p-2">{voucher.detail}</td>
                                        <td className="p-2">{voucher.mode}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Save Voucher</button>
                        <button className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-lg">Refresh</button>
                        <button className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-lg">Print Preview</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
