import { useState, useEffect } from "react";
import { PiTrash, PiPlusCircle, PiList, PiListNumbers } from "react-icons/pi";
import { Spinner } from "react-activity";
import useCreateFlashcard from "../../hooks/Flashcards/useCreateFlashcard";
import toast from "react-hot-toast";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";

export interface AddFlashcardDialogProps {
  deckId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const AddFlashcardDialog = ({
  deckId,
  onClose,
  onSuccess,
}: AddFlashcardDialogProps) => {
  const { createFlashcard, loading } = useCreateFlashcard();
  const [flashcardFront, setFlashcardFront] = useState("");
  const [flashcardBack, setFlashcardBack] = useState("");
  const [activeField, setActiveField] = useState<"front" | "back">("front");

  const handleCreateFlashcard = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmpty: boolean = !flashcardFront.trim() || !flashcardBack.trim();

    if (isEmpty) {
      toast.error("Both front and back text are required.");
      return;
    }

    const result = await createFlashcard({
      id: "",
      front: flashcardFront,
      back: flashcardBack,
      deckId,
    });

    if (result.error) {
      toast.error("Failed to create flashcard. Please try again.");
      return;
    }

    if (result.success) {
      toast.success("Flashcard created successfully.");
      setFlashcardFront("");
      setFlashcardBack("");
      onSuccess();
      onClose();
    }
  };

  const modifyText = (type: "bulleted" | "numbered") => {
    const currentText =
      activeField === "front" ? flashcardFront : flashcardBack;
    const formattedText = currentText
      .split("\n")
      .map((line, index) => {
        const cleanedLine = line.replace(/^(•|\d+\.)\s*/, "").trim();
        if (!cleanedLine) return "";
        return type === "bulleted"
          ? `• ${cleanedLine}`
          : `${index + 1}. ${cleanedLine}`;
      })
      .join("\n");

    if (activeField === "front") {
      setFlashcardFront(formattedText);
    } else {
      setFlashcardBack(formattedText);
    }
  };

  const clearFrontText = () => {
    setFlashcardFront("");
  };

  const clearBackText = () => {
    setFlashcardBack("");
  };

  const clearAllText = () => {
    setFlashcardFront("");
    setFlashcardBack("");
  };

  useEffect(() => {
    return () => {
      clearAllText();
    };
  }, [onClose]);

  useEffect(() => {
    clearAllText();
  }, []);

  return (
    <DialogContent className="sm:max-w-[425px] bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg">
      <DialogHeader className="select-none">
        <DialogTitle>Create New Flashcard</DialogTitle>
        <DialogDescription>
          Create a new flashcard here. Provide the front and back contents for
          the card. Click add card when you are done.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleCreateFlashcard}>
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="relative flex flex-col gap-2">
              <Label className="text-base">Question</Label>
              <Textarea
                className="p-3 pr-12 md:text-lg lg:text-xl resize-none dark:border-dark-border"
                placeholder="Enter the question for the flashcard (e.g., What is the capital of France?)"
                value={flashcardFront}
                onChange={(e) => setFlashcardFront(e.target.value)}
                onFocus={() => setActiveField("front")}
                disabled={loading}
              />
              {flashcardFront && (
                <button
                  className="absolute right-5 top-16 -translate-y-1/4 text-gray-400 hover:text-red-500 transition-colors"
                  type="button"
                  onClick={clearFrontText}
                >
                  <PiTrash size={24} />
                </button>
              )}
            </div>
            <div className="relative flex flex-col gap-2">
              <Label className="text-base">Answer</Label>
              <Textarea
                className="p-3 pr-12 md:text-lg lg:text-xl resize-none dark:border-dark-border"
                placeholder="Enter the answer for the flashcard (e.g., Paris)"
                value={flashcardBack}
                onChange={(e) => setFlashcardBack(e.target.value)}
                onFocus={() => setActiveField("back")}
                disabled={loading}
              />
              {flashcardBack && (
                <button
                  className="absolute right-5 top-16 -translate-y-1/4 text-gray-400 hover:text-red-500 transition-colors"
                  type="button"
                  onClick={clearBackText}
                >
                  <PiTrash size={24} />
                </button>
              )}

              <div className="editText bg-white dark:bg-dark-background text-gray-400 text-sm mt-2 flex justify-between mb-2">
                <div className="flex gap-2">
                  <button
                    className="p-2 text-black hover:bg-gray-200 dark:text-white hover:dark:bg-dark-foreground rounded"
                    type="button"
                    onClick={() => modifyText("bulleted")}
                  >
                    <PiList size={24} />
                  </button>
                  <button
                    className="p-2 text-black hover:bg-gray-200 dark:text-white hover:dark:bg-dark-foreground rounded"
                    type="button"
                    onClick={() => modifyText("numbered")}
                  >
                    <PiListNumbers size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="space-y-4 select-none">
          <Button
            className={`flex-1 px-4 py-2 md:px-6 h-12 md:py-3 flex items-center justify-center ${loading ? "bg-gray-300" : "bg-green hover:bg-green/90"} text-white rounded-lg text-base md:text-xl font-semibold transition-colors disabled:opacity-50 gap-2`}
            disabled={
              loading || !flashcardFront.trim() || !flashcardBack.trim()
            }
            type="submit"
          >
            {loading ? (
              <Spinner size={12} color="#fff" animating={true} />
            ) : (
              <>
                <PiPlusCircle size={24} />
                Add Flashcard
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AddFlashcardDialog;
