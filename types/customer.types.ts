export type TCollextedBy = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
};

export type TVerificationStatus = "PENDING" | "VERIFIED";

export type TCustomer = {
  collectedBy: TCollextedBy;
  collectedById: string;
  collectionDate: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  interestedProduct: string;
  isDeleted: boolean;
  location: string;
  name: string;
  phoneNumber: string;
  updatedAt: string;
  verificationStatus: TVerificationStatus;
};
