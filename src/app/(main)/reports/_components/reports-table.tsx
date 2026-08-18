"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PATHS } from "@/app/_constants/paths";
import { ReportTableRow } from "@/app/_hooks/queries/report/report.type";
import { createImageErrorHandler, formatDateTime, getImageSrcWithFallback } from "@/lib/utils";
import { Eye } from "lucide-react";

const getReportStatusStyles = (status?: string) => {
  const key = status?.toLowerCase().replace(/\s+/g, "") ?? "";
  switch (key) {
    case "new":
      return "bg-[#EEF5FF] text-[#007AFF] border-[#9EC5FF]";
    case "underreview":
      return "bg-[#FFF7E8] text-[#C87800] border-[#F5C97A]";
    case "resolved":
      return "bg-[#E4FFE8] text-[#2F9E44] border-[#8FD99A]";
    case "dismissed":
      return "bg-[#F5F5F5] text-[#737373] border-[#D9D9D9]";
    default:
      return "bg-[#F5F5F5] text-[#737373] border-[#D9D9D9]";
  }
};

const AvatarCell = ({ src, alt }: { src?: string | null; alt: string }) => {
  const [imageError, setImageError] = useState(false);
  const missingImage = !src?.trim();

  return (
    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#F0F0F0] shrink-0">
      <Image
        src={getImageSrcWithFallback(src || "", imageError || missingImage)}
        alt={alt}
        width={32}
        height={32}
        className="w-8 h-8 object-cover"
        onError={createImageErrorHandler(setImageError)}
      />
    </div>
  );
};

type Props = {
  data: ReportTableRow[];
};

const ReportsTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto border border-[#EEEEEE] rounded-xl bg-white">
      <table className="w-full min-w-[760px] text-left">
        <thead className="bg-[#FAFAFA] border-b border-[#EEEEEE]">
          <tr>
            <th className="px-4 py-3 text-xs font-medium text-[#737373]">Reported Entity</th>
            <th className="px-4 py-3 text-xs font-medium text-[#737373]">Type</th>
            <th className="px-4 py-3 text-xs font-medium text-[#737373]">Reason</th>
            <th className="px-4 py-3 text-xs font-medium text-[#737373]">Date</th>
            <th className="px-4 py-3 text-xs font-medium text-[#737373]">Status</th>
            <th className="px-4 py-3 text-xs font-medium text-[#737373]" />
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.reportId || `${item.reportedEntity}-${item.createdAt}`} className="border-b border-[#F0F0F0] last:border-0">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <AvatarCell src={item.reportedPersonImg} alt={item.reportedEntity} />
                  <span className="text-sm font-medium text-[#222222]">{item.reportedEntity}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-[#737373]">{item.type}</td>
              <td className="px-4 py-3 text-sm text-[#737373] max-w-[220px] truncate" title={item.reason}>
                {item.reason}
              </td>
              <td className="px-4 py-3 text-sm text-[#737373] whitespace-nowrap">
                {item.createdAt ? formatDateTime(item.createdAt) : "—"}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getReportStatusStyles(item.status)}`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3">
                {item.reportId ? (
                  <Link
                    href={`${PATHS.REPORTS}/${item.reportId}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#007AFF] hover:underline"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                ) : (
                  <span className="text-sm text-[#B2B2B2]">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
