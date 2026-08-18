import { getRequestParams, postRequest } from "@/app/_config/request-methods";
import { MutationProps } from "@/app/_types/mutation-prop-types";
import handleApiError from "@/app/_utils/handle-api-error";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IReportUserResponse,
  ReportDateFilter,
  ReportDetailsResponse,
  ReportEvidenceMedia,
  ReportListItem,
  ReportTableRow,
  ReportUserPayload,
  ReportUserStatus,
  ReportsPaginatedResponse,
} from "./report.type";

export const REPORTS = "useGetReports";
export const REPORT_DETAILS = "useGetReportDetails";

const getCaseInsensitiveString = (record: Record<string, unknown>, key: string) => {
  const entry = Object.entries(record).find(
    ([recordKey]) => recordKey.toLowerCase() === key.toLowerCase()
  );
  return typeof entry?.[1] === "string" ? entry[1].trim() : "";
};

export const normalizeReportEvidence = (items?: unknown[]): ReportEvidenceMedia[] => {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      if (typeof item === "string") {
        const url = item.trim();
        return url ? { mediaType: "", url } : null;
      }

      if (!item || typeof item !== "object") return null;

      const record = item as Record<string, unknown>;
      const url = getCaseInsensitiveString(record, "url");
      if (!url) return null;

      return {
        mediaType: getCaseInsensitiveString(record, "mediatype"),
        url,
      };
    })
    .filter((item): item is ReportEvidenceMedia => item !== null);
};

const formatReportStatus = (status?: string) => {
  if (!status) return "New";
  if (status === "UnderReview") return "Under Review";
  return status;
};

export const mapReportToTableRow = (item: ReportListItem): ReportTableRow => ({
  reportId: item.reportId ?? "",
  reporter: item.reporterName ?? item.reporter ?? item.reportedByName ?? "—",
  reporterImg: item.reporterImg ?? null,
  type: item.reportType ?? item.type ?? "—",
  reportedEntity:
    item.reportedPersonName ?? item.reportedUserName ?? item.reportedEntity ?? "—",
  reportedPersonImg: item.reportedPersonImg ?? null,
  reason: item.reason ?? item.description ?? "—",
  status: formatReportStatus(item.status),
  createdAt: item.created ?? item.createdOn ?? item.createdAt ?? "",
});

export const useReportUser = (props: MutationProps) => {
  const { onSuccess, onError } = props;

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: ({ payload }: ReportUserPayload) =>
      postRequest<ReportUserPayload["payload"], IReportUserResponse>({
        url: "/report/user",
        payload,
      }),

    onSuccess(values) {
      onSuccess(values);
    },

    onError(err) {
      const msgError = handleApiError(err);
      if (onError) {
        onError(msgError, err);
      }
    },
  });

  return {
    mutate,
    isError,
    isSuccess,
    isPending,
  };
};

export const useGetReports = (props: {
  enabler: boolean;
  searhParam?: string;
  status?: ReportUserStatus;
  reportFilerDate?: ReportDateFilter;
  userId?: string;
  pageNumber?: number;
  perpageSize?: number;
}) => {
  const {
    enabler = true,
    searhParam,
    status = "All",
    reportFilerDate = "All",
    userId,
    pageNumber = 1,
    perpageSize = 20,
  } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: [
      REPORTS,
      searhParam,
      status,
      reportFilerDate,
      userId,
      pageNumber,
      perpageSize,
    ],
    queryFn: async ({ signal }) =>
      getRequestParams<
        {
          searhParam?: string;
          status: ReportUserStatus;
          reportFilerDate?: ReportDateFilter;
          UserId?: string;
          pageNumber?: number;
          perpageSize?: number;
        },
        ReportsPaginatedResponse
      >({
        url: "/report/paginated/all",
        params: {
          searhParam: searhParam?.trim() || undefined,
          status,
          reportFilerDate: reportFilerDate === "All" ? undefined : reportFilerDate,
          UserId: userId?.trim() || undefined,
          pageNumber,
          perpageSize,
        },
        config: { signal },
      }),
    enabled: !!enabler,
  });

  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  };
};

export const useGetReportDetails = (props: { reportId: string; enabler: boolean }) => {
  const { reportId, enabler } = props;

  const { data, isError, isSuccess, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: [REPORT_DETAILS, reportId],
    queryFn: async ({ signal }) =>
      getRequestParams<{ reportId: string }, ReportDetailsResponse>({
        url: "/report/single/details",
        params: { reportId },
        config: { signal },
      }),
    enabled: !!enabler && !!reportId,
  });

  return {
    data: data?.result,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
