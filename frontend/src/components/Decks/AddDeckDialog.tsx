import { useState, useEffect } from "react";
import { PiTrash, PiPlusCircle } from "react-icons/pi";
import { Spinner } from "react-activity";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export interface AddDeckDialogProps {
  onClose: () => void;
  onSuccess: () => void;
  createDeck: (deckName: string) => Promise<void>;
  loading: boolean;
}

const AddDeckDialog = ({
  onClose,
  onSuccess,
  createDeck,
  loading,
}: AddDeckDialogProps) => {
  const [deckName, setDeckName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deckName.trim()) {
      toast.error("Deck Name is required.");
      return;
    }

    try {
      await createDeck(deckName);
      clearText();
      onSuccess();
      onClose();
      toast.success("Deck added successfully.");
    } catch {
      toast.error("Failed to create deck. Please try again.");
    }
  };

  const clearText = () => {
    setDeckName("");
  };

  useEffect(() => {
    return () => {
      clearText();
    };
  }, [onClose]);

  useEffect(() => {
    clearText();
  }, []);

  return (
    <DialogContent className="sm:max-w-[425px] bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg">
      <DialogHeader>
        <DialogTitle className="select-none">Create New Deck</DialogTitle>
        <DialogDescription className="select-none">
          Create a new deck here. Click add deck when you are done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            className="px-2.5 py-1.5 pr-11 rounded-lg border bg-white dark:text-black focus:outline-none focus:ring-1 focus:ring-green focus:ring-offset-2 hover:outline-none hover:ring-green hover:ring-1 hover:ring-offset-2 transition-all"
            placeholder="Enter deck name"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            disabled={loading}
            maxLength={50}
          />
          {deckName && (
            <button
              onClick={clearText}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <PiTrash size={24} />
            </button>
          )}
        </div>

        <div className="text-sm text-gray-500 text-right select-none my-2 mb-4">
          {deckName.length} / 50 characters
        </div>

        <DialogFooter className="space-y-4">
          <Button
            className={`flex-1 px-4 py-2 h-12 md:px-6 md:py-3 flex items-center justify-center ${loading ? "bg-gray-300" : "bg-green hover:bg-green/90"} text-white rounded-lg text-base md:text-xl font-semibold transition-colors disabled:opacity-50 gap-2 select-none`}
            disabled={loading || !deckName.trim()}
            type="submit"
          >
            {loading ? (
              <Spinner size={12} color="#fff" animating={true} />
            ) : (
              <>
                <PiPlusCircle size={24} />
                Add Deck
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AddDeckDialog;
