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
