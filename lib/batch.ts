/**
 * Monthly batch calculation — always in Asia/Kolkata (IST, UTC+05:30, no DST).
 *
 *  - A new batch starts on the 25th of every month at 8:30 PM IST.
 *  - If the 25th is a Sunday, the batch starts on Monday the 26th.
 *  - Registration stays available until the actual start time. Once that
 *    batch has started, registrations apply to the following month's batch.
 *
 * Pure functions only, so the website, the chatbot and (later) the payment
 * server can share exactly one implementation.
 */

export const BATCH_TIME_ZONE = "Asia/Kolkata";
export const BATCH_START_LABEL = "8:30 PM IST";

const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;
const START_HOUR = 20;
const START_MINUTE = 30;

export type Batch = {
  /** Instant the batch begins (and registration for it closes). */
  start: Date;
  /** Day of month the batch actually starts on (25 or 26). */
  startDay: number;
  /** True when the 25th fell on a Sunday and the batch moved to Monday the 26th. */
  adjustedForSunday: boolean;
  /** Stable id, e.g. "2026-10". */
  id: string;
};

function batchForMonth(year: number, month: number): Batch {
  const sunday = new Date(Date.UTC(year, month, 25)).getUTCDay() === 0;
  const startDay = sunday ? 26 : 25;
  // Wall-clock IST → UTC instant.
  const start = new Date(Date.UTC(year, month, startDay, START_HOUR, START_MINUTE) - IST_OFFSET_MS);
  return { start, startDay, adjustedForSunday: sunday, id: `${year}-${String(month + 1).padStart(2, "0")}` };
}

/** The batch that a registration made at `now` belongs to. */
export function getBatch(now: Date = new Date()): Batch {
  const ist = new Date(now.getTime() + IST_OFFSET_MS);
  let year = ist.getUTCFullYear();
  let month = ist.getUTCMonth();
  let batch = batchForMonth(year, month);
  if (now.getTime() >= batch.start.getTime()) {
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    batch = batchForMonth(year, month);
  }
  return batch;
}

const dateFmt = new Intl.DateTimeFormat("en-IN", { timeZone: BATCH_TIME_ZONE, weekday: "long", day: "numeric", month: "long", year: "numeric" });

/** e.g. "Friday, 25 December 2026" */
export function formatBatchDate(batch: Batch): string {
  return dateFmt.format(batch.start);
}

/** Short explanation shown only when the Sunday rule moved the date. */
export function batchAdjustmentNote(batch: Batch): string | null {
  return batch.adjustedForSunday ? "The 25th is a Sunday, so this batch starts on Monday the 26th." : null;
}

/**
 * Whether new registrations are accepted: the owner switch must be on AND the
 * batch must not have started yet (`getBatch` already rolls over at start time,
 * so this only guards against a caller passing an old batch).
 */
export function isRegistrationOpen(batch: Batch, ownerOpen: boolean, now: Date = new Date()): boolean {
  return ownerOpen && now.getTime() < batch.start.getTime();
}
