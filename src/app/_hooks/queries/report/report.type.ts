type ReportType = "Conflict" | "Fraud" | "Foul Language";

type EvidenceMedia = {
  mediaType: string;
  url: string;
};

type ReportUser = {
  reportedUserId: string;
  description: string;
  reportType: ReportType;
  evidenceMediaFiles: EvidenceMedia[];
};

export type ReportUserPayload = Prettify<BaseApiPayloadDto<ReportUser>>;

export interface IReportUserResponse {
  statusCode: number;
  displayMessage: string;
  result: string;
  errorMessages: string | null;
}

export type ReportUserStatus =
  | "All"
  | "New"
  | "UnderReview"
  | "Resolved"
  | "Dismissed";

export type ReportDateFilter = "All" | "LastWeek" | "LastMonth";

export const REPORT_STATUS_OPTIONS: { value: ReportUserStatus; label: string }[] = [
  { value: "All", label: "All" },
  { value: "New", label: "New" },
  { value: "UnderReview", label: "Under Review" },
  { value: "Resolved", label: "Resolved" },
  { value: "Dismissed", label: "Dismissed" },
];

export const REPORT_DATE_FILTER_OPTIONS: { value: ReportDateFilter; label: string }[] = [
  { value: "All", label: "All Time" },
  { value: "LastWeek", label: "Last Week" },
  { value: "LastMonth", label: "Last Month" },
];

export interface ReportListItem {
  reportId?: string;
  reporterId?: string;
  reporterName?: string;
  reporterImg?: string | null;
  reporter?: string;
  reportedByName?: string;
  reportedPersonId?: string;
  reportedPersonName?: string;
  reportedPersonImg?: string | null;
  reportedUserName?: string;
  reportedEntity?: string;
  reportType?: string;
  type?: string;
  reason?: string;
  description?: string;
  status?: string;
  created?: string;
  createdOn?: string;
  createdAt?: string;
}

export interface ReportsPaginatedResult {
  items?: ReportListItem[];
  totalCount?: number;
  pageNumber?: number;
  totalPages?: number;
  pageSize?: number;
}

export interface ReportsPaginatedResponse {
  statusCode: number;
  displayMessage: string;
  result: ReportsPaginatedResult;
  errorMessages: string[] | null;
}

export interface ReportDetails {
  reportId: string;
  reporterId: string;
  reporterName: string;
  reporterImg: string | null;
  reportedPersonId: string;
  reportedPersonName: string;
  reportedPersonImg: string | null;
  reportedPersonRating: string;
  reportedPersonTotalSwap: string;
  reportType: string;
  reason: string;
  status: string;
  notes: string[];
  evidenceImg: ReportEvidenceApiItem[];
  created: string;
}

export interface ReportEvidenceMedia {
  mediaType: string;
  url: string;
}

export type ReportEvidenceApiItem = Record<string, unknown>;

export interface ReportDetailsResponse {
  statusCode: number;
  displayMessage: string;
  result: ReportDetails;
  errorMessages: string[] | null;
}

export type ReportTableRow = {
  reportId: string;
  reporter: string;
  reporterImg: string | null;
  type: string;
  reportedEntity: string;
  reportedPersonImg: string | null;
  reason: string;
  status: string;
  createdAt: string;
};
