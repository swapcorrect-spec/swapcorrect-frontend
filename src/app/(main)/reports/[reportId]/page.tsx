"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PATHS } from "@/app/_constants/paths";
import {
  normalizeReportEvidence,
  useGetReportDetails,
} from "@/app/_hooks/queries/report/report";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createImageErrorHandler, formatDateTime, getImageSrcWithFallback } from "@/lib/utils";

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

const formatReportStatus = (status?: string) => {
  if (!status) return "New";
  if (status === "UnderReview") return "Under Review";
  return status;
};

const PersonCard = ({
  title,
  name,
  image,
  href,
  meta,
}: {
  title: string;
  name: string;
  image?: string | null;
  href?: string;
  meta?: string;
}) => {
  const [imageError, setImageError] = useState(false);
  const missingImage = !image?.trim();

  const content = (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-[#F0F0F0] shrink-0">
        <Image
          src={getImageSrcWithFallback(image || "", imageError || missingImage)}
          alt={name}
          width={48}
          height={48}
          className="w-12 h-12 object-cover"
          onError={createImageErrorHandler(setImageError)}
        />
      </div>
      <div>
        <p className="text-sm font-medium text-[#222222]">{name || "—"}</p>
        {meta && <p className="text-xs text-[#737373] mt-0.5">{meta}</p>}
      </div>
    </div>
  );

  return (
    <div className="border border-[#EEEEEE] rounded-xl p-4 bg-white">
      <p className="text-xs font-medium text-[#007AFF] mb-3">{title}</p>
      {href ? (
        <Link href={href} className="hover:opacity-80 transition-opacity">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
};

const ReportDetailsPage = () => {
  const params = useParams<{ reportId: string }>();
  const reportId = params?.reportId || "";

  const { data: report, isLoading, isFetching, isError, refetch } = useGetReportDetails({
    reportId,
    enabler: !!reportId,
  });

  const evidence = normalizeReportEvidence(report?.evidenceImg);
  const notes = report?.notes ?? [];
  const showLoading = isLoading || isFetching;

  if (showLoading) {
    return (
      <div className="w-[92%] mx-auto my-8 md:my-10 space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-6 w-72" />
        <div className="grid md:grid-cols-2 gap-4">
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-[92%] mx-auto my-8 md:my-10">
        <Link
          href={PATHS.REPORTS}
          className="inline-flex items-center gap-2 text-sm text-[#007AFF] mb-6"
        >
          <ArrowLeft size={16} />
          Back to reports
        </Link>
        <div className="border border-[#EEEEEE] rounded-xl bg-white px-6 py-16 text-center">
          <p className="text-lg font-medium text-[#222222] mb-2">Could not load report</p>
          <p className="text-sm text-[#737373] mb-6">
            We had trouble fetching this report. Please try again.
          </p>
          <Button onClick={() => refetch()} className="rounded-xl">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="w-[92%] mx-auto my-8 md:my-10">
        <Link
          href={PATHS.REPORTS}
          className="inline-flex items-center gap-2 text-sm text-[#007AFF] mb-6"
        >
          <ArrowLeft size={16} />
          Back to reports
        </Link>
        <div className="border border-[#EEEEEE] rounded-xl bg-white px-6 py-16 text-center">
          <p className="text-lg font-medium text-[#222222] mb-2">Report not found</p>
          <p className="text-sm text-[#737373]">
            Select a report from the list to view its details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[92%] mx-auto my-8 md:my-10">
      <Link
        href={PATHS.REPORTS}
        className="inline-flex items-center gap-2 text-sm text-[#007AFF] mb-6"
      >
        <ArrowLeft size={16} />
        Back to reports
      </Link>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-medium text-[#222222]">Report Details</h1>
          <p className="text-sm text-[#737373] mt-1">
            {report.reportType} report against {report.reportedPersonName || "this user"}
          </p>
          <p className="text-xs text-[#B2B2B2] mt-2">Report ID: {report.reportId}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium border bg-[#F5F5F5] text-[#222222] border-[#E9E9E9]">
            {report.reportType}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getReportStatusStyles(report.status)}`}
          >
            {formatReportStatus(report.status)}
          </span>
          <span className="text-xs text-[#737373]">
            Reported {report.created ? formatDateTime(report.created) : "—"}
          </span>
        </div>
      </div>

      <div className="mb-4 max-w-md">
        <PersonCard
          title="Reported Person"
          name={report.reportedPersonName}
          image={report.reportedPersonImg}
          href={report.reportedPersonId ? `/profile/${report.reportedPersonId}` : undefined}
          meta={[
            report.reportedPersonRating ? `Rating: ${report.reportedPersonRating}` : null,
            report.reportedPersonTotalSwap
              ? `${report.reportedPersonTotalSwap} swaps`
              : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        />
      </div>

      <div className="border border-[#EEEEEE] rounded-xl p-4 bg-white mb-4">
        <p className="text-xs font-medium text-[#007AFF] mb-2">Report Reason</p>
        <p className="text-sm text-[#222222] whitespace-pre-wrap">{report.reason || "—"}</p>
      </div>

      <div className="border border-[#EEEEEE] rounded-xl p-4 bg-white mb-4">
        <p className="text-xs font-medium text-[#007AFF] mb-3">Evidence</p>
        {evidence.length === 0 ? (
          <p className="text-sm text-[#737373]">No evidence attached.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {evidence.map((item, index) => {
              const isVideo = item.mediaType?.toLowerCase().includes("video");
              return (
                <a
                  key={`${item.url}-${index}`}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="relative aspect-square rounded-lg overflow-hidden bg-[#F5F5F5] border border-[#EEEEEE]"
                >
                  {isVideo ? (
                    <video src={item.url} className="w-full h-full object-cover" />
                  ) : (
                    <Image
                      src={item.url}
                      alt={`Evidence ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </a>
              );
            })}
          </div>
        )}
      </div>

      <div className="border border-[#EEEEEE] rounded-xl p-4 bg-white">
        <p className="text-xs font-medium text-[#007AFF] mb-3">Notes</p>
        {notes.length === 0 ? (
          <p className="text-sm text-[#737373]">No notes yet.</p>
        ) : (
          <ul className="space-y-3">
            {notes.map((note, index) => (
              <li
                key={`${note}-${index}`}
                className="text-sm text-[#222222] bg-[#FAFAFA] border border-[#F0F0F0] rounded-lg px-3 py-2"
              >
                {note}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReportDetailsPage;
