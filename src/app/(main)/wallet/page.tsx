"use client";

import { FC, useState, useMemo } from "react";
import Title from "@/components/shared/tltle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Plus, Edit2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import AccountModal from "./components/account-modal";
import { useAddUpdateBankAccount, useGetBankAccountInfo, useGetAllBanks } from "@/app/_hooks/queries/wallet/wallet";

const WalletPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: accountInfo, isLoading: isLoadingAccount } = useGetBankAccountInfo({
    enabler: true,
  });

  const { data: banksData } = useGetAllBanks({
    enabler: !!accountInfo?.bankCode,
  });

  const { addUpdateBankAccount, isPending } = useAddUpdateBankAccount({
    onSuccess: () => {
      setIsModalOpen(false);
    },
  });

  // Transform API response to match our UI structure
  const accountData = useMemo(() => {
    if (!accountInfo) return null;
    
    const banks = banksData || [];
    const bankCode = accountInfo.bankCode || "";
    const matchedBank = banks.find((bank: any) => (bank.code || "") === bankCode);
    const bankName = matchedBank?.name || "";
    
    return {
      bankCode: bankCode,
      bankName: bankName,
      accountNumber: accountInfo.accountNumber || "",
      accountName: accountInfo.accountName || "",
    };
  }, [accountInfo, banksData]);

  const handleAddAccount = () => {
    setIsUpdating(false);
    setIsModalOpen(true);
  };

  const handleUpdateAccount = () => {
    setIsUpdating(true);
    setIsModalOpen(true);
  };

  const handleSubmitAccount = (data: {
    bankCode: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
  }) => {
    addUpdateBankAccount({
      bankCode: data.bankCode,
      accountNumber: data.accountNumber,
      accountName: data.accountName,
    });
  };

  return (
    <section className="p-6">
      <div className="border border-[#E9E9E9] rounded-lg p-6 mb-6">
        <Title title="Wallet" description="Manage your account details." />

        {/* Account Details Card */}
        <div className="mt-6">
          <Card className="border-1 border-[#E9E9E9] bg-[#F5F5F5]">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[#222222] font-medium text-lg mb-2">
                    Account Details
                  </h3>
                  <p className="text-[#737373] text-sm">
                    Your bank account information for transactions
                  </p>
                </div>
                {!isLoadingAccount && accountData && (accountData.bankCode || accountData.accountNumber || accountData.accountName) && (
                  <Button
                    className="rounded-md bg-[#007AFF] hover:bg-[#0056CC] text-white flex items-center gap-2"
                    onClick={handleUpdateAccount}
                  >
                    <Edit2 size={14} />
                    Update
                  </Button>
                )}
              </div>

              {isLoadingAccount ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-md">
                    <Skeleton className="w-[40px] h-[40px] rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-md">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <div className="p-4 bg-white rounded-md">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                  </div>
                </div>
              ) : accountData && (accountData.bankCode || accountData.accountNumber || accountData.accountName) ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-md">
                    <div
                      className="w-[40px] h-[40px] rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#E0EFFF" }}
                    >
                      <Building2 size={20} color="#007AFF" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#737373]">Bank Name</p>
                      <p className="text-base font-medium text-[#222222]">
                        {accountData.bankName || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-md">
                      <p className="text-sm text-[#737373] mb-1">Account Number</p>
                      <p className="text-base font-medium text-[#222222]">
                        {accountData.accountNumber || "N/A"}
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-md">
                      <p className="text-sm text-[#737373] mb-1">Account Name</p>
                      <p className="text-base font-medium text-[#222222]">
                        {accountData.accountName || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div
                    className="w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "#E0EFFF" }}
                  >
                    <Building2 size={30} color="#007AFF" />
                  </div>
                  <p className="text-[#737373] text-sm mb-4">
                    No account details added yet
                  </p>
                  <Button
                    className="rounded-full bg-[#007AFF] hover:bg-[#0056CC] text-white flex items-center gap-2 mx-auto"
                    onClick={handleAddAccount}
                  >
                    <Plus size={16} />
                    Add Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Account Modal */}
      <AccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitAccount}
        isLoading={isPending}
        initialData={isUpdating ? accountData : null}
      />
    </section>
  );
};

export default WalletPage;
