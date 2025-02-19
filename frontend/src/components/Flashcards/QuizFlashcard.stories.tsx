import { Meta, StoryFn } from "@storybook/react";
import QuizFlashcard, { QuizFlashcardProps } from "./QuizFlashcard";

const meta: Meta<typeof QuizFlashcard> = {
  title: "Components/Flashcards/QuizFlashcard",
  component: QuizFlashcard,
  decorators: [
    (Story) => {
      return (
        <div className="relative w-full max-w-5xl overflow-hidden rounded-xl">
          <div className="flex">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default meta;

const Template: StoryFn<QuizFlashcardProps> = (args) => {
  return <QuizFlashcard {...args} />;
};

export const Default = Template.bind({});
Default.args = { back: "back", front: "front", isBackVisible: false };

export const BackVisible = Template.bind({});
BackVisible.args = { back: "back", front: "front", isBackVisible: true };

export const Empty = Template.bind({});
Empty.args = { back: "", front: "", isBackVisible: true };

export const LongText = Template.bind({});
LongText.args = {
  back: "wow this is a very long text to put in the back of a flashcard i wonder how long this could get hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm wow this is a very long text to put in the back of a flashcard i wonder how long this could get hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
  front:
    "wow this is a very long text to put in front of a flashcard i wonder how long this could get hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm wow this is a very long text to put in front of a flashcard i wonder how long this could get hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
  isBackVisible: true,
};
