"use client";

import { FC, useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllBanks } from "@/app/_hooks/queries/wallet/wallet";
import { Check, Search } from "lucide-react";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { bankCode: string; bankName: string; accountNumber: string; accountName: string }) => void;
  isLoading?: boolean;
  initialData?: {
    bankCode: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
  } | null;
}

const AccountModal: FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  initialData = null,
}) => {
  const [bankCode, setBankCode] = useState(initialData?.bankCode || "");
  const [bankName, setBankName] = useState(initialData?.bankName || "");
  const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || "");
  const [accountName, setAccountName] = useState(initialData?.accountName || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({
    bankCode: "",
    accountNumber: "",
    accountName: "",
  });

  const { data: banksData, isLoading: isLoadingBanks } = useGetAllBanks({
    enabler: isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      setBankCode(initialData?.bankCode || "");
      setBankName(initialData?.bankName || "");
      setAccountNumber(initialData?.accountNumber || "");
      setAccountName(initialData?.accountName || "");
      setSearchQuery("");
      setErrors({ bankCode: "", accountNumber: "", accountName: "" });
    }
  }, [isOpen, initialData]);

  const validateAccountNumber = (value: string) => {
    return /^\d+$/.test(value);
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setAccountNumber(value);
      if (value && !validateAccountNumber(value)) {
        setErrors((prev) => ({ ...prev, accountNumber: "Account number must contain only numbers" }));
      } else {
        setErrors((prev) => ({ ...prev, accountNumber: "" }));
      }
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      bankCode: !bankCode ? "Please select a bank" : "",
      accountNumber: !accountNumber ? "Account number is required" : !validateAccountNumber(accountNumber) ? "Account number must contain only numbers" : "",
      accountName: !accountName ? "Account name is required" : "",
    };

    setErrors(newErrors);

    if (newErrors.bankCode || newErrors.accountNumber || newErrors.accountName) {
      return;
    }

    onSubmit({ bankCode, bankName, accountNumber, accountName });
  };

  const handleClose = () => {
    setBankCode("");
    setBankName("");
    setAccountNumber("");
    setAccountName("");
    setSearchQuery("");
    setErrors({ bankCode: "", accountNumber: "", accountName: "" });
    onClose();
  };

  const banks = banksData || [];

  const filteredBanks = useMemo(() => {
    if (!searchQuery.trim()) {
      return banks;
    }
    return banks.filter((bank: any) => {
      const bankDisplayName = bank.name || bank;
      return bankDisplayName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [banks, searchQuery]);

  const handleBankSelect = (bank: any) => {
    const selectedBankName = bank.name || bank;
    const selectedBankCode = bank.code || "";
    setBankName(selectedBankName);
    setBankCode(selectedBankCode);
    setErrors((prev) => ({ ...prev, bankCode: "" }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="left-[50%] max-w-[500px] translate-x-[-50%] p-6 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[#222222] text-xl font-medium">
            {initialData ? "Update Account Details" : "Add Account Details"}
          </DialogTitle>
          <DialogDescription className="text-[#737373] text-sm">
            {initialData
              ? "Update your bank account information below."
              : "Enter your bank account information below."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4 overflow-y-auto flex-1">
          <div>
            <p className="text-sm font-medium text-[#222222] mb-2">Select Bank</p>
            <Input
              placeholder="Search banks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startIcon={<Search size={16} />}
              className="mb-3"
            />
            <div className="border border-[#E9E9E9] rounded-md max-h-[200px] overflow-y-auto">
              {isLoadingBanks ? (
                <div className="p-4 text-center text-sm text-[#737373]">
                  Loading banks...
                </div>
              ) : filteredBanks.length > 0 ? (
                <div className="divide-y divide-[#E9E9E9]">
                  {filteredBanks.map((bank: any, index: number) => {
                    const bankDisplayName = bank.name || bank;
                    const bankCodeValue = bank.code || "";
                    const isSelected = bankCode === bankCodeValue;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleBankSelect(bank)}
                        className={`w-full px-4 py-3 text-left hover:bg-[#F5F5F5] transition-colors flex items-center justify-between ${
                          isSelected ? "bg-[#E0EFFF]" : ""
                        }`}
                      >
                        <span className={`text-sm ${isSelected ? "text-[#007AFF] font-medium" : "text-[#222222]"}`}>
                          {bankDisplayName}
                        </span>
                        {isSelected && <Check size={16} color="#007AFF" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-[#737373]">
                  {searchQuery ? "No banks found matching your search" : "No banks available"}
                </div>
              )}
            </div>
          </div>

          {errors.bankCode && (
            <p className="text-sm text-red-500 -mt-2">{errors.bankCode}</p>
          )}

          <Input
            label="Account Number"
            placeholder="Enter account number"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            type="text"
            error={errors.accountNumber}
            maxLength={10}
          />

          <Input
            label="Account Name"
            placeholder="Enter account name"
            value={accountName}
            onChange={(e) => {
              setAccountName(e.target.value);
              setErrors((prev) => ({ ...prev, accountName: "" }));
            }}
            type="text"
            error={errors.accountName}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            className="bg-[#007AFF] hover:bg-[#0056CC] text-white"
            onClick={handleSubmit}
            disabled={isLoading || !bankCode || !accountNumber || !accountName}
            loading={isLoading}
          >
            {initialData ? "Update" : "Add Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountModal;

