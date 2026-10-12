import React from 'react';
import { ShieldCheck, Landmark, ArrowRight } from 'lucide-react';

const mockWalletData = {
    guaranteeText: 'CAPGN ESCROW GUARANTEE',
    depositLabel: 'Next Scheduled Deposit',
    amount: '$1,850.00',
    depositMethod: 'Tomorrow via Direct Deposit (Austin CU)',
    escrowNote: '100% of agreed budget in escrow',
    actionText: 'View Wallet'
};

const CreatorWallet = ({ data = mockWalletData }) => {
    return (
        <div className="relative overflow-hidden w-full max-w-md bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-5 shadow-md">
            {/* Decorative semi-circle background accent on the right */}
            <div
                className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full pointer-events-none"
                aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Top Guarantee Badge */}
                <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase text-blue-100">
                    <ShieldCheck className="w-4 h-4 text-blue-200" />
                    <span>{data.guaranteeText}</span>
                </div>

                {/* Deposit Info Section */}
                <div className="mt-3">
                    <p className="text-xs font-medium text-blue-100/90">
                        {data.depositLabel}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-0.5 text-white">
                        {data.amount}
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-blue-100 mt-1">
                        <Landmark className="w-3.5 h-3.5 shrink-0" />
                        <span>{data.depositMethod}</span>
                    </div>
                </div>

                {/* Bottom Footer Row */}
                <div className="flex items-center justify-between gap-2 mt-5 pt-2">
                    <p className="text-[11px] font-semibold text-blue-100/80">
                        {data.escrowNote}
                    </p>

                    <button className="flex items-center gap-1 text-xs font-bold text-white hover:text-blue-100 underline underline-offset-2 transition-colors">
                        {data.actionText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatorWallet;