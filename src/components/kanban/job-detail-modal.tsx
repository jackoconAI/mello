"use client";

import { Job } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Camera, ExternalLink, MapPin, Phone, Mail, Calendar } from "lucide-react";

interface JobDetailModalProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-[#f87b4d] uppercase tracking-wider mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider min-w-[140px] flex-shrink-0">
        {label}
      </span>
      <span className="text-sm text-gray-800">{value}</span>
    </div>
  );
}

export function JobDetailModal({ job, open, onClose }: JobDetailModalProps) {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>{job.client_name}</span>
            <Badge variant="default">{job.status.toUpperCase()}</Badge>
          </DialogTitle>
          <DialogClose onClose={onClose} />
        </DialogHeader>

        <div className="p-6 space-y-0">
          {/* Quick links bar */}
          <div className="flex flex-wrap gap-3 mb-6 p-3 bg-gray-50 rounded-xl">
            {job.google_photos_link && (
              <a
                href={job.google_photos_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f87b4d] text-white text-sm font-medium hover:bg-[#e5693d] transition-colors"
              >
                <Camera className="h-4 w-4" />
                Google Photos
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {job.matterport_link && (
              <a
                href={job.matterport_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Matterport Tour
              </a>
            )}
          </div>

          {/* Client Info */}
          <Section title="Client Information">
            <Field label="Client Name" value={job.client_name} />
            <Field label="Phone" value={job.client_phone} />
            <Field label="Email" value={job.client_email} />
            <Field label="Address" value={job.address} />
            <Field label="Access Notes" value={job.jobsite_access_notes} />
            <Field label="Referral Partner" value={job.referral_partner} />
            <Field label="Preferred Plumber" value={job.preferred_plumber} />
            <Field label="Damage Consultant" value={job.damage_consultant} />
            <Field label="Mitigation Lead" value={job.mitigation_lead} />
            <Field label="PCC" value={job.pre_construction_consultant} />
          </Section>

          {/* Claim Information */}
          <Section title="Claim Information">
            <Field label="Policy Cap/Limit" value={job.policy_cap_or_limit} />
            <Field label="Mortgage" value={job.mortgage} />
            <Field label="HO6" value={job.ho6} />
            <Field label="Drywall Estimate" value={job.drywall_estimate} />
            <Field label="Cause of Loss" value={job.cause_of_loss} />
            <Field label="COL Repaired" value={job.col_repaired} />
            <Field label="Carrier" value={job.carrier} />
            <Field label="# of Checks" value={job.number_of_checks} />
          </Section>

          {/* Payment Breakdown */}
          <Section title="Check Info / Payment Breakdown">
            <Field label="Entrusted Estimate" value={job.entrusted_estimate} />
            <Field label="Insurance Approved" value={job.insurance_approved_amount} />
            <Field label="Deductible" value={job.deductible} />
            <Field label="Recoverable Dep." value={job.recoverable_depreciation} />
            <Field label="Check Amount(s)" value={job.check_amounts} />
            <Field label="WTR Amount" value={job.entrusted_wtr_amount} />
            <Field label="WTR Check Loc." value={job.wtr_check_location} />
            <Field label="MLD Amount" value={job.entrusted_mld_amount} />
            <Field label="Ins. MLD Approved" value={job.insurance_mld_approved_amount} />
            <Field label="MLD Check Loc." value={job.mld_check_location} />
            <Field label="Payment Notes" value={job.payment_notes} />
          </Section>

          {/* Important Notes */}
          <Section title="Important Notes">
            <Field label="Scope Changes" value={job.scope_changes} />
            <Field label="Additional Work" value={job.additional_work} />
            <Field label="Client SOM" value={job.client_som} />
          </Section>

          {/* PCC Meeting Notes */}
          <Section title="PCC Meeting Notes">
            <Field label="Date of PCC MTG" value={formatDate(job.date_of_pcc_mtg)} />
            <Field label="Estimates Needed" value={job.estimates_needed} />
            <Field label="Cabinet Repl/Rep" value={job.cabinet_replacement_repair} />
            <Field label="Threats" value={job.threats} />
          </Section>

          {/* Full Scope */}
          {job.full_scope && (
            <Section title="Full Scope">
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed border border-gray-100">
                {job.full_scope}
              </div>
            </Section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
