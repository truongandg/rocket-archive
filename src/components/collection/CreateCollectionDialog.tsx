import { X } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";

interface CreateCollectionDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export default function CreateCollectionDialog({
  open,
  onClose,
  onCreate,
}: CreateCollectionDialogProps) {
  const [name, setName] = useState("");
  if (!open) return null;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;
    onCreate(name);
    setName("");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-collection-title"
      className="fixed inset-0 z-[60] grid place-items-center bg-black/75 px-6 backdrop-blur-sm"
    >
      <form
        onSubmit={submit}
        className="w-full max-w-md border border-white/25 bg-[#090909] p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[10px] font-semibold tracking-[.2em] text-white/45">
              PERSONAL ARCHIVE
            </p>
            <h2
              id="new-collection-title"
              className="mt-2 text-2xl font-semibold tracking-[-.04em]"
            >
              NEW COLLECTION
            </h2>
          </div>
          <Button
            variant="ghost"
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="h-9 w-9 p-0"
          >
            <X size={18} />
          </Button>
        </div>
        <label className="mt-8 block text-[10px] font-semibold tracking-[.16em] text-white/55">
          COLLECTION NAME
          <input
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="E.G. REUSABLE ROCKETS"
            className="mt-3 h-12 w-full border border-white/25 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-white"
          />
        </label>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="ghost"
            type="button"
            onClick={onClose}
            className="px-4 py-3 text-[10px] font-bold tracking-[.14em]"
          >
            CANCEL
          </Button>
          <Button
            type="submit"
            className="px-5 py-3 text-[10px] font-bold tracking-[.14em]"
          >
            CREATE COLLECTION
          </Button>
        </div>
      </form>
    </div>
  );
}
