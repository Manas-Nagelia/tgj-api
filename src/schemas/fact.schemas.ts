import z from "zod";

// Enums
const ClaimVerdict = z.enum(["supported", "contradicted", "unverifiable"]);
const FactualityOverall = z.enum(["high", "mixed", "low", "unknown"]);

// Sub-schemas
const EvidenceSchema = z.object({
  url: z.string().min(1),
  snippet: z.string().min(1),
});

const ClaimCheckSchema = z.object({
  claim: z.string().min(1),
  evidence: z.array(EvidenceSchema).max(4), // 0–4 items
  verdict: ClaimVerdict,
  reasoning: z.string().min(1),
});

const FactualitySummarySchema = z.object({
  supported: z.number().int().min(0),
  contradicted: z.number().int().min(0),
  unverifiable: z.number().int().min(0),
  overall: FactualityOverall,
});

// Root schema
export const FactCheckResultSchema = z.object({
  claims: z.array(ClaimCheckSchema).max(5), // 0–5 claims
  factualitySummary: FactualitySummarySchema,
});