"use client";

import { useState } from "react";
import ReactPaginate from "react-paginate";
import Title from "@/components/shared/tltle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { useDebounce } from "@/app/_hooks/useDebounce";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";
import {
  mapReportToTableRow,
  useGetReports,
} from "@/app/_hooks/queries/report/report";
import {
  REPORT_DATE_FILTER_OPTIONS,
  REPORT_STATUS_OPTIONS,
  ReportDateFilter,
  ReportUserStatus,
} from "@/app/_hooks/queries/report/report.type";
import ReportsTable from "./reports-table";

const ReportsPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState<ReportUserStatus>("All");
  const [reportFilerDate, setReportFilerDate] = useState<ReportDateFilter>("All");

  const debouncedSearch = useDebounce(searchInput, 500);

  const { data: userData } = useGetUserInfo({ enabler: true });
  const userId = userData?.result?.id || "";

  const { data, isLoading, isFetching, isError, refetch } = useGetReports({
    enabler: !!userId,
    searhParam: debouncedSearch,
    status,
    reportFilerDate,
    userId,
    pageNumber,
    perpageSize: 20,
  });

  const reports = (data?.items ?? []).map(mapReportToTableRow);
  const totalPages = data?.totalPages || 1;
  const showLoading = !userId || isLoading || (isFetching && reports.length === 0);

  return (
    <div className="w-[92%] max-w-full min-w-0 mx-auto my-8 md:my-10">
      <Title title="REPORTS" description="View reports linked to your account." />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <Input
          startIcon={<Search />}
          className="w-full !h-10 rounded-lg"
          placeholder="Search reports..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setPageNumber(1);
          }}
        />
        <select
          className="w-full h-10 rounded-lg border border-[#E9E9E9] px-3 text-sm text-[#222222] bg-white"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as ReportUserStatus);
            setPageNumber(1);
          }}
        >
          {REPORT_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          className="w-full h-10 rounded-lg border border-[#E9E9E9] px-3 text-sm text-[#222222] bg-white"
          value={reportFilerDate}
          onChange={(e) => {
            setReportFilerDate(e.target.value as ReportDateFilter);
            setPageNumber(1);
          }}
        >
          {REPORT_DATE_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {showLoading ? (
        <div className="border border-[#EEEEEE] rounded-xl overflow-hidden bg-white">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 px-4 py-4 border-b border-[#F0F0F0]">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="border border-[#EEEEEE] rounded-xl bg-white px-6 py-16 text-center">
          <p className="text-lg font-medium text-[#222222] mb-2">Could not load reports</p>
          <p className="text-sm text-[#737373] mb-6">
            We had trouble fetching reports. Please try again.
          </p>
          <Button onClick={() => refetch()} className="rounded-xl">
            Retry
          </Button>
        </div>
      ) : reports.length === 0 ? (
        <div className="border border-[#EEEEEE] rounded-xl bg-white px-6 py-16 text-center">
          <p className="text-lg font-medium text-[#222222] mb-2">No reports yet</p>
          <p className="text-sm text-[#737373]">
            There are no flags or reports to show for the current filters.
          </p>
        </div>
      ) : (
        <>
          <ReportsTable data={reports} />
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 w-full min-w-0">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next ›"
                previousLabel="‹ Previous"
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={totalPages}
                renderOnZeroPageCount={null}
                onPageChange={({ selected }) => setPageNumber(selected + 1)}
                forcePage={pageNumber - 1}
                pageClassName="w-8 h-8 sm:w-10 sm:h-10 shrink-0"
                previousLinkClassName="px-2 sm:px-4 py-2 rounded-lg border hover:bg-gray-100 whitespace-nowrap"
                nextLinkClassName="px-2 sm:px-4 py-2 rounded-lg border hover:bg-gray-100 whitespace-nowrap"
                containerClassName="flex items-center justify-center flex-wrap gap-1 sm:gap-2 max-w-full"
                pageLinkClassName="w-full h-full flex items-center justify-center rounded-lg border hover:bg-gray-100"
                activeLinkClassName="bg-blue-500 text-white border-blue-500 hover:bg-blue-500"
                previousClassName={pageNumber === 1 ? "pointer-events-none opacity-40" : ""}
                nextClassName={
                  pageNumber === totalPages || totalPages === 0
                    ? "pointer-events-none opacity-40"
                    : ""
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReportsPage;
