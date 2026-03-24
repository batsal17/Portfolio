import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-4 mb-4", className)}>
      <span className="font-mono text-[10px] text-[var(--accent)] tracking-[0.2em] uppercase">
        {index}
      </span>
      <span className="font-mono text-[10px] dark:text-zinc-500 text-zinc-500 tracking-[0.15em] uppercase">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-[var(--border-color)] to-transparent" />
    </div>
  );
}
