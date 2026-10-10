"use client";

import { useEffect, useState } from "react";
import { enrolment } from "@/config/site";
import { batchAdjustmentNote, formatBatchDate, getBatch, isRegistrationOpen, type Batch } from "@/lib/batch";

export type BatchView = {
  batch: Batch;
  dateLabel: string;
  adjustmentNote: string | null;
  registrationOpen: boolean;
  /** ms until the batch starts (and registration closes). */
  msLeft: number;
};

/**
 * The batch a new registration belongs to, recalculated in the visitor's
 * browser (Asia/Kolkata maths) so a statically built page never shows a stale
 * date. Returns null until mounted to avoid a server/client mismatch.
 */
export function useBatch(tickMs = 1000): BatchView | null {
  const [view, setView] = useState<BatchView | null>(null);
  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const batch = getBatch(now);
      setView({
        batch,
        dateLabel: formatBatchDate(batch),
        adjustmentNote: batchAdjustmentNote(batch),
        registrationOpen: isRegistrationOpen(batch, enrolment.registrationOpen, now),
        msLeft: Math.max(0, batch.start.getTime() - now.getTime()),
      });
    };
    compute();
    const id = setInterval(compute, tickMs);
    return () => clearInterval(id);
  }, [tickMs]);
  return view;
}
