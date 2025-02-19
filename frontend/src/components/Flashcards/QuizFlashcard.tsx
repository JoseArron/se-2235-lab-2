import { Separator } from "@radix-ui/react-separator";
import { Label } from "../ui/label";

export interface QuizFlashcardProps {
  front: string;
  back: string;
  isBackVisible: boolean;
}

const QuizFlashcard: React.FC<QuizFlashcardProps> = ({
  front,
  back,
  isBackVisible,
}) => {
  return (
    <div className="flex flex-col w-full h-full md:min-h-44 lg:min-h-44 xl:min-h-44 md:h-full lg:h-full xl:h-full bg-white border-2 border-green rounded-xl p-4 sm:p-6 shadow-sm dark:bg-dark-foreground">
      {/* Front Content */}
      <div className="front flex w-full min-h-[50px]">
        <Label
          className="text-wrap overflow-hidden"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: "1.5",
          }}
        >
          {front}
        </Label>
      </div>

      {/* Separator */}
      <Separator className="border-t-2 border-gray-300 dark:border-800 w-full my-4" />

      {/* Back Content */}
      <div className="back flex w-full flex-1 min-h-[50px]">
        <Label
          className="text-wrap overflow-hidden"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: "1.5",
          }}
        >
          {isBackVisible ? (
            back
          ) : (
            <Label className="bg-gray-200 dark:bg-dark-foreground py-1 px-2">
              ___
            </Label>
          )}
        </Label>
      </div>
    </div>
  );
};

export default QuizFlashcard;
