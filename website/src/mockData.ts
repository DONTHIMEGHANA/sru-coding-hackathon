export type ClaimStatus =
  | "draft"
  | "submitted"
  | "document_verification"
  | "field_inspection_scheduled"
  | "field_inspection_completed"
  | "officer_review"
  | "approved"
  | "rejected"
  | "payment_processing"
  | "paid";

export const CLAIM_STATUS_CONFIG: Record<ClaimStatus, { label: string; color: string; bgColor: string }> = {
  draft: { label: "Draft", color: "text-muted-foreground", bgColor: "bg-muted" },
  submitted: { label: "Submitted", color: "text-info-foreground", bgColor: "bg-info" },
  document_verification: { label: "Document Verification", color: "text-warning-foreground", bgColor: "bg-warning" },
  field_inspection_scheduled: { label: "Field Inspection Scheduled", color: "text-info-foreground", bgColor: "bg-info" },
  field_inspection_completed: { label: "Field Inspection Done", color: "text-info-foreground", bgColor: "bg-info/80" },
  officer_review: { label: "Officer Review", color: "text-warning-foreground", bgColor: "bg-warning" },
  approved: { label: "Approved", color: "text-success-foreground", bgColor: "bg-success" },
  rejected: { label: "Rejected", color: "text-destructive-foreground", bgColor: "bg-destructive" },
  payment_processing: { label: "Payment Processing", color: "text-secondary-foreground", bgColor: "bg-secondary" },
  paid: { label: "Paid", color: "text-success-foreground", bgColor: "bg-success" },
};

export const CLAIM_WORKFLOW_ORDER: ClaimStatus[] = [
  "draft", "submitted", "document_verification", "field_inspection_scheduled",
  "field_inspection_completed", "officer_review", "approved", "payment_processing", "paid",
];

export const DISASTER_TYPES = [
  { id: "flood", label: "Flood (बाढ़)" },
  { id: "drought", label: "Drought (सूखा)" },
  { id: "cyclone", label: "Cyclone (चक्रवात)" },
  { id: "hailstorm", label: "Hailstorm (ओलावृष्टि)" },
  { id: "pest_attack", label: "Pest Attack (कीट हमला)" },
];

export const BIHAR_DISTRICTS = [
  "Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga",
  "Purnia", "Araria", "Begusarai", "Chapra", "Hajipur",
  "Munger", "Samastipur", "Sitamarhi", "Siwan", "Madhubani",
  "Nalanda", "Vaishali", "Katihar", "Buxar", "Rohtas",
];

export const CROP_TYPES = [
  "Rice (धान)", "Wheat (गेहूं)", "Maize (मक्का)", "Sugarcane (गन्ना)",
  "Potato (आलू)", "Lentils (दाल)", "Mustard (सरसों)", "Jute (जूट)",
];

export const SEASONS = ["Kharif 2024", "Rabi 2024", "Kharif 2025", "Rabi 2025"];

export interface ClaimLog {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  role: string;
  remarks: string;
  oldStatus?: ClaimStatus;
  newStatus?: ClaimStatus;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: "pending" | "verified" | "rejected";
  remarks?: string;
}

export interface Claim {
  id: string;
  claimId: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  district: string;
  block: string;
  village: string;
  season: string;
  cropType: string;
  areaInAcres: number;
  disasterType: string;
  disasterDate: string;
  estimatedLoss: number;
  claimAmount: number;
  status: ClaimStatus;
  createdAt: string;
  updatedAt: string;
  documents: Document[];
  logs: ClaimLog[];
  assignedOfficer?: string;
}

export const MOCK_CLAIMS: Claim[] = [
  {
    id: "1",
    claimId: "BH-2024-KH-00142",
    farmerId: "f1",
    farmerName: "Ramesh Kumar",
    farmerPhone: "9876543210",
    district: "Patna",
    block: "Danapur",
    village: "Khagaul",
    season: "Kharif 2024",
    cropType: "Rice (धान)",
    areaInAcres: 3.5,
    disasterType: "Flood (बाढ़)",
    disasterDate: "2024-08-15",
    estimatedLoss: 85000,
    claimAmount: 72000,
    status: "officer_review",
    createdAt: "2024-08-20T10:30:00Z",
    updatedAt: "2024-09-10T14:20:00Z",
    assignedOfficer: "o1",
    documents: [
      { id: "d1", name: "Aadhaar Card", type: "identity", uploadedAt: "2024-08-20", status: "verified" },
      { id: "d2", name: "Land Record (Khatauni)", type: "land_proof", uploadedAt: "2024-08-20", status: "verified" },
      { id: "d3", name: "Bank Passbook", type: "bank_proof", uploadedAt: "2024-08-21", status: "verified" },
      { id: "d4", name: "Crop Damage Photo", type: "crop_image", uploadedAt: "2024-08-21", status: "pending" },
    ],
    logs: [
      { id: "l1", timestamp: "2024-08-20T10:30:00Z", action: "Claim Created", performedBy: "Ramesh Kumar", role: "farmer", remarks: "Claim submitted after flood damage", newStatus: "submitted" },
      { id: "l2", timestamp: "2024-08-22T09:00:00Z", action: "Documents Under Review", performedBy: "System", role: "system", remarks: "Automatic status change", oldStatus: "submitted", newStatus: "document_verification" },
      { id: "l3", timestamp: "2024-08-28T11:15:00Z", action: "Field Inspection Scheduled", performedBy: "Sunil Verma", role: "officer", remarks: "Inspection on 2024-09-02", oldStatus: "document_verification", newStatus: "field_inspection_scheduled" },
      { id: "l4", timestamp: "2024-09-02T16:00:00Z", action: "Field Inspection Completed", performedBy: "Sunil Verma", role: "officer", remarks: "Significant flood damage confirmed on 3.5 acres", oldStatus: "field_inspection_scheduled", newStatus: "field_inspection_completed" },
      { id: "l5", timestamp: "2024-09-10T14:20:00Z", action: "Sent for Officer Review", performedBy: "System", role: "system", remarks: "Final review pending", oldStatus: "field_inspection_completed", newStatus: "officer_review" },
    ],
  },
  {
    id: "2",
    claimId: "BH-2024-KH-00198",
    farmerId: "f1",
    farmerName: "Ramesh Kumar",
    farmerPhone: "9876543210",
    district: "Patna",
    block: "Phulwari",
    village: "Anisabad",
    season: "Kharif 2024",
    cropType: "Maize (मक्का)",
    areaInAcres: 2.0,
    disasterType: "Flood (बाढ़)",
    disasterDate: "2024-08-15",
    estimatedLoss: 45000,
    claimAmount: 38000,
    status: "approved",
    createdAt: "2024-08-22T08:00:00Z",
    updatedAt: "2024-09-15T10:00:00Z",
    assignedOfficer: "o1",
    documents: [
      { id: "d5", name: "Aadhaar Card", type: "identity", uploadedAt: "2024-08-22", status: "verified" },
      { id: "d6", name: "Land Record", type: "land_proof", uploadedAt: "2024-08-22", status: "verified" },
      { id: "d7", name: "Bank Passbook", type: "bank_proof", uploadedAt: "2024-08-22", status: "verified" },
    ],
    logs: [
      { id: "l6", timestamp: "2024-08-22T08:00:00Z", action: "Claim Created", performedBy: "Ramesh Kumar", role: "farmer", remarks: "Maize crop damaged", newStatus: "submitted" },
      { id: "l7", timestamp: "2024-09-15T10:00:00Z", action: "Claim Approved", performedBy: "Sunil Verma", role: "officer", remarks: "All documents verified, loss confirmed", oldStatus: "officer_review", newStatus: "approved" },
    ],
  },
  {
    id: "3",
    claimId: "BH-2024-KH-00210",
    farmerId: "f2",
    farmerName: "Sita Devi",
    farmerPhone: "9876543213",
    district: "Muzaffarpur",
    block: "Kanti",
    village: "Bochaha",
    season: "Kharif 2024",
    cropType: "Rice (धान)",
    areaInAcres: 5.0,
    disasterType: "Flood (बाढ़)",
    disasterDate: "2024-08-18",
    estimatedLoss: 120000,
    claimAmount: 100000,
    status: "submitted",
    createdAt: "2024-08-25T07:30:00Z",
    updatedAt: "2024-08-25T07:30:00Z",
    documents: [
      { id: "d8", name: "Aadhaar Card", type: "identity", uploadedAt: "2024-08-25", status: "pending" },
    ],
    logs: [
      { id: "l8", timestamp: "2024-08-25T07:30:00Z", action: "Claim Created", performedBy: "Sita Devi", role: "farmer", remarks: "Rice crop fully damaged", newStatus: "submitted" },
    ],
  },
  {
    id: "4",
    claimId: "BH-2024-RB-00055",
    farmerId: "f3",
    farmerName: "Mohan Singh",
    farmerPhone: "9876543214",
    district: "Gaya",
    block: "Bodh Gaya",
    village: "Mastipur",
    season: "Rabi 2024",
    cropType: "Wheat (गेहूं)",
    areaInAcres: 4.0,
    disasterType: "Drought (सूखा)",
    disasterDate: "2024-03-10",
    estimatedLoss: 95000,
    claimAmount: 80000,
    status: "paid",
    createdAt: "2024-03-15T09:00:00Z",
    updatedAt: "2024-05-10T12:00:00Z",
    assignedOfficer: "o1",
    documents: [
      { id: "d9", name: "Aadhaar Card", type: "identity", uploadedAt: "2024-03-15", status: "verified" },
      { id: "d10", name: "Land Record", type: "land_proof", uploadedAt: "2024-03-15", status: "verified" },
      { id: "d11", name: "Bank Passbook", type: "bank_proof", uploadedAt: "2024-03-15", status: "verified" },
      { id: "d12", name: "Crop Images", type: "crop_image", uploadedAt: "2024-03-16", status: "verified" },
    ],
    logs: [
      { id: "l9", timestamp: "2024-03-15T09:00:00Z", action: "Claim Created", performedBy: "Mohan Singh", role: "farmer", remarks: "Wheat crop drought damage", newStatus: "submitted" },
      { id: "l10", timestamp: "2024-05-01T10:00:00Z", action: "Claim Approved", performedBy: "Sunil Verma", role: "officer", remarks: "Approved after verification", oldStatus: "officer_review", newStatus: "approved" },
      { id: "l11", timestamp: "2024-05-10T12:00:00Z", action: "Payment Completed", performedBy: "Admin Bihar", role: "admin", remarks: "₹80,000 transferred to bank account", oldStatus: "payment_processing", newStatus: "paid" },
    ],
  },
  {
    id: "5",
    claimId: "BH-2024-KH-00305",
    farmerId: "f4",
    farmerName: "Lakshmi Prasad",
    farmerPhone: "9876543215",
    district: "Darbhanga",
    block: "Jale",
    village: "Kamtaul",
    season: "Kharif 2024",
    cropType: "Sugarcane (गन्ना)",
    areaInAcres: 6.0,
    disasterType: "Flood (बाढ़)",
    disasterDate: "2024-08-20",
    estimatedLoss: 180000,
    claimAmount: 150000,
    status: "document_verification",
    createdAt: "2024-08-28T11:00:00Z",
    updatedAt: "2024-09-01T09:00:00Z",
    documents: [
      { id: "d13", name: "Aadhaar Card", type: "identity", uploadedAt: "2024-08-28", status: "verified" },
      { id: "d14", name: "Land Record", type: "land_proof", uploadedAt: "2024-08-28", status: "pending" },
    ],
    logs: [
      { id: "l12", timestamp: "2024-08-28T11:00:00Z", action: "Claim Created", performedBy: "Lakshmi Prasad", role: "farmer", remarks: "Sugarcane field flooded", newStatus: "submitted" },
      { id: "l13", timestamp: "2024-09-01T09:00:00Z", action: "Document Verification Started", performedBy: "System", role: "system", remarks: "Verifying uploaded documents", oldStatus: "submitted", newStatus: "document_verification" },
    ],
  },
  {
    id: "6",
    claimId: "BH-2024-KH-00350",
    farmerId: "f5",
    farmerName: "Rajesh Yadav",
    farmerPhone: "9876543216",
    district: "Purnia",
    block: "Kasba",
    village: "Dhamdaha",
    season: "Kharif 2024",
    cropType: "Jute (जूट)",
    areaInAcres: 3.0,
    disasterType: "Flood (बाढ़)",
    disasterDate: "2024-08-22",
    estimatedLoss: 60000,
    claimAmount: 50000,
    status: "rejected",
    createdAt: "2024-08-30T14:00:00Z",
    updatedAt: "2024-09-20T16:00:00Z",
    assignedOfficer: "o1",
    documents: [
      { id: "d15", name: "Aadhaar Card", type: "identity", uploadedAt: "2024-08-30", status: "verified" },
    ],
    logs: [
      { id: "l14", timestamp: "2024-08-30T14:00:00Z", action: "Claim Created", performedBy: "Rajesh Yadav", role: "farmer", remarks: "Jute crop damaged", newStatus: "submitted" },
      { id: "l15", timestamp: "2024-09-20T16:00:00Z", action: "Claim Rejected", performedBy: "Sunil Verma", role: "officer", remarks: "Insufficient documentation. Land records not provided.", oldStatus: "officer_review", newStatus: "rejected" },
    ],
  },
];

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "Claim Status Updated", message: "Your claim BH-2024-KH-00142 is now under Officer Review.", timestamp: "2024-09-10T14:20:00Z", read: false, type: "info" },
  { id: "n2", title: "Claim Approved!", message: "Your claim BH-2024-KH-00198 has been approved. Payment processing will begin shortly.", timestamp: "2024-09-15T10:00:00Z", read: false, type: "success" },
  { id: "n3", title: "Document Required", message: "Please upload Bank Passbook for claim BH-2024-KH-00142.", timestamp: "2024-09-08T09:00:00Z", read: true, type: "warning" },
  { id: "n4", title: "Welcome!", message: "Your farmer registration is complete. You can now submit crop insurance claims.", timestamp: "2024-08-19T08:00:00Z", read: true, type: "info" },
];
