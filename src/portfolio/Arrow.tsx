type Direction = "up-right" | "down-right" | "down-left" | "left" | "right" | "down";

export default function Arrow({ direction = "up-right", size }: { direction?: Direction; size?: number }) {
  return <svg className={`arrow-icon arrow-${direction}`} width={size ?? "1em"} height={size ?? "1em"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14" /></svg>;
}
