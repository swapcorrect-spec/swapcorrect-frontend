"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileVideo, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useReportUser } from "@/app/_hooks/queries/report/report";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const REPORT_TYPES = ["Conflict", "Fraud", "Foul Language"] as const;

const reportUserSchema = z.object({
  reportType: z.enum(["Conflict", "Fraud", "Foul Language"], {
    errorMap: () => ({ message: "Please select a report type" }),
  }),
  description: z
    .string()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters"),
  reportedUserId: z.string().min(1),
});

type ReportForm = z.infer<typeof reportUserSchema>;

type EvidenceMedia = {
  mediaType: string;
  url: string;
};

type ReportUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  reportedUserId: string;
  userName?: string;
};

const uploadToCloudinary = async (file: File) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

  if (!cloudName || !uploadPreset) {
    console.error("Cloudinary credentials not found!");
    return null;
  }

  let resourceType = "auto";
  if (file.type.startsWith("image/")) {
    resourceType = "image";
  } else if (file.type.startsWith("video/")) {
    resourceType = "video";
  } else {
    resourceType = "raw";
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "swap_shop/reports");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) return null;
  return response.json();
};

const ReportUserModal: FC<ReportUserModalProps> = ({
  isOpen,
  onClose,
  reportedUserId,
  userName,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [reportFiles, setReportFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReportForm>({
    resolver: zodResolver(reportUserSchema),
    defaultValues: {
      reportType: "" as ReportForm["reportType"],
      description: "",
      reportedUserId,
    },
  });

  const { mutate: reportUser, isPending: isReporting } = useReportUser({
    onSuccess(val: { result?: string; displayMessage?: string }) {
      toast.success(val?.result || val?.displayMessage || "Report submitted successfully!");
      onClose();
    },
    onError(err) {
      toast.error(err || "Failed to submit report. Please try again.");
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setReportFiles([]);
      setIsUploading(false);
      reset({
        reportType: "" as ReportForm["reportType"],
        description: "",
        reportedUserId,
      });
    } else {
      setValue("reportedUserId", reportedUserId);
    }
  }, [isOpen, reportedUserId, reset, setValue]);

  const handleSubmit = async () => {
    const reportType = watch("reportType");
    const description = watch("description");

    if (!reportType || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (reportFiles.length === 0) {
      toast.error("Please add at least one evidence file");
      return;
    }

    try {
      setIsUploading(true);

      const uploaded = (
        await Promise.all(
          reportFiles.map(async (file) => {
            const result = await uploadToCloudinary(file);
            if (!result?.secure_url) return null;
            return {
              mediaType: file.type.startsWith("image/")
                ? "Image"
                : file.type.startsWith("video/")
                  ? "Video"
                  : "File",
              url: result.secure_url as string,
            } satisfies EvidenceMedia;
          })
        )
      ).filter(Boolean) as EvidenceMedia[];

      if (uploaded.length === 0) {
        toast.error("Failed to upload evidence. Please try again.");
        return;
      }

      reportUser({
        payload: {
          reportType,
          description,
          evidenceMediaFiles: uploaded,
          reportedUserId,
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while submitting the report.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-xl mx-auto rounded-xl">
        <div className="w-full mx-auto max-h-[85vh] overflow-y-auto overflow-x-hidden p-1 space-y-3">
          <div>
            <h2 className="text-lg font-semibold text-[#222222]">Report User</h2>
            <p className="text-sm text-[#737373] mt-0.5">
              {userName
                ? `Tell us what happened with ${userName} and attach evidence so we can review this report.`
                : "Tell us what happened and attach evidence so we can review this report."}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#222222]">Report Type</label>
            <select
              className="w-full border border-[#E9E9E9] rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF]"
              value={watch("reportType")}
              onChange={(e) =>
                setValue("reportType", e.target.value as ReportForm["reportType"], {
                  shouldValidate: true,
                })
              }
            >
              <option value="">Select report type</option>
              {REPORT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.reportType && (
              <p className="text-red-500 text-xs mt-1">{errors.reportType.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#222222]">Description</label>
            <textarea
              className="w-full border border-[#E9E9E9] rounded-xl p-3 min-h-[88px] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF]"
              placeholder="Describe what happened..."
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#222222]">Evidence</label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => {
                if (!e.target.files) return;
                const newFiles = Array.from(e.target.files);
                setReportFiles((prev) => [...prev, ...newFiles]);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border border-dashed border-[#007AFF]/40 bg-[#007AFF]/5 hover:bg-[#007AFF]/10 rounded-xl px-4 py-3 transition-colors"
            >
              <div className="flex flex-col items-center gap-1.5 text-center">
                <div className="w-8 h-8 rounded-full bg-[#007AFF]/10 flex items-center justify-center">
                  <Upload size={16} className="text-[#007AFF]" />
                </div>
                <p className="text-sm font-medium text-[#222222]">Click to upload evidence</p>
                <p className="text-xs text-[#737373]">Images or videos · multiple files ok</p>
              </div>
            </button>

            {reportFiles.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-1.5">
                {reportFiles.map((file, idx) => {
                  const isImage = file.type.startsWith("image/");
                  return (
                    <div
                      key={`${file.name}-${idx}`}
                      className="relative border border-[#E9E9E9] rounded-xl overflow-hidden bg-[#FAFAFA]"
                    >
                      {isImage ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-16 object-cover"
                        />
                      ) : (
                        <div className="h-16 flex flex-col items-center justify-center gap-1 px-1">
                          <FileVideo size={16} className="text-[#737373]" />
                          <span className="text-[10px] text-[#737373] truncate w-full text-center">
                            {file.name}
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        aria-label="Remove file"
                        className="absolute top-1 right-1 bg-[#E42222] text-white rounded-full p-0.5"
                        onClick={() => setReportFiles((prev) => prev.filter((_, i) => i !== idx))}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={onClose}
              disabled={isReporting || isUploading}
            >
              Cancel
            </Button>
            <Button
              className="rounded-xl bg-[#222222] hover:bg-black"
              disabled={isReporting || isUploading}
              onClick={handleSubmit}
              loading={isReporting || isUploading}
            >
              {isUploading ? "Uploading..." : isReporting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportUserModal;
