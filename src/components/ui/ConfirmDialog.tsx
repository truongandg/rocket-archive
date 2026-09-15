import Button from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "DELETE",
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-[80] grid place-items-center bg-black/75 px-6 backdrop-blur-sm"
    >
      <div className="w-full max-w-md border border-white/25 bg-[#090909] p-6 shadow-2xl">
        <p className="text-[10px] font-semibold tracking-[.2em] text-white/45">
          CONFIRM ACTION
        </p>
        <h2
          id="confirm-dialog-title"
          className="mt-2 text-2xl font-semibold tracking-[-.04em]"
        >
          {title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          {description}
        </p>
        <div className="mt-8 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="px-4 py-3 text-[10px] font-bold tracking-[.14em]"
          >
            CANCEL
          </Button>
          <Button
            onClick={onConfirm}
            className="border-red-300/70 px-5 py-3 text-[10px] font-bold tracking-[.14em] text-red-200 hover:border-red-200 hover:bg-red-200"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
