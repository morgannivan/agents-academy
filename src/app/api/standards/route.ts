import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Standard, ListStandardsResponse, ApiError } from "@/lib/api/types";

/** Mock standards organized by domain. */
const STANDARDS: Standard[] = [
  // Healthcare
  { id: "std-hipaa-privacy", name: "HIPAA Privacy Rule", domain: "Healthcare", description: "Protects patient health information from being disclosed without consent." },
  { id: "std-hipaa-security", name: "HIPAA Security Rule", domain: "Healthcare", description: "Sets standards for safeguarding electronic protected health information." },
  { id: "std-hl7-fhir", name: "HL7 FHIR Interoperability", domain: "Healthcare", description: "Standard for exchanging healthcare information electronically." },
  { id: "std-phi-deident", name: "PHI De-identification", domain: "Healthcare", description: "Guidelines for removing identifiable health information." },

  // Finance
  { id: "std-soc2", name: "SOC 2 Type II", domain: "Finance", description: "Audit framework for managing customer data based on trust service criteria." },
  { id: "std-pci-dss", name: "PCI-DSS v4.0", domain: "Finance", description: "Security standard for organizations handling credit card information." },
  { id: "std-aml-kyc", name: "AML/KYC Validation", domain: "Finance", description: "Anti-money laundering and know-your-customer compliance checks." },
  { id: "std-sec-regbi", name: "SEC Reg-BI Compliance", domain: "Finance", description: "Regulation Best Interest standard for broker-dealer conduct." },

  // Legal
  { id: "std-gdpr-22", name: "GDPR Article 22 Compliance", domain: "Legal", description: "Protects against automated decision-making without human intervention." },
  { id: "std-ediscovery", name: "eDiscovery Protocol", domain: "Legal", description: "Standards for identifying and delivering electronic information in litigation." },
  { id: "std-citation-accuracy", name: "Citation Accuracy Standard", domain: "Legal", description: "Ensures legal citations are verified and accurate." },

  // DevOps
  { id: "std-iso27001", name: "ISO 27001 Controls", domain: "DevOps", description: "Information security management system standard." },
  { id: "std-nist-csf", name: "NIST CSF Alignment", domain: "DevOps", description: "Framework for improving critical infrastructure cybersecurity." },
  { id: "std-least-priv", name: "Least-Privilege Enforcement", domain: "DevOps", description: "Users and systems operate with minimum required permissions." },

  // Customer Support
  { id: "std-gdpr-dsr", name: "GDPR Data Subject Requests", domain: "Customer Support", description: "Handling data access, rectification, and deletion requests." },
  { id: "std-pii-masking", name: "PII Masking Standard", domain: "Customer Support", description: "Masking personally identifiable information in logs and displays." },
  { id: "std-escalation-sla", name: "Escalation SLA Compliance", domain: "Customer Support", description: "Adherence to service-level agreements for ticket escalation." },
];

/** GET /api/standards – list available standards, optionally filtered by domain */
export async function GET(
  request: NextRequest,
): Promise<NextResponse<ListStandardsResponse | ApiError>> {
  const domain = request.nextUrl.searchParams.get("domain") ?? undefined;

  let results = STANDARDS;
  if (domain) {
    results = results.filter(
      (s) => s.domain.toLowerCase() === domain.toLowerCase(),
    );
  }

  return NextResponse.json({ standards: results });
}
