import { Meta, StoryFn } from "@storybook/react";
import AddDeckDialog, { AddDeckDialogProps } from "./AddDeckDialog";
import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { Toaster } from "react-hot-toast";

const meta: Meta<typeof AddDeckDialog> = {
  title: "Components/Decks/AddDeckDialog",
  component: AddDeckDialog,
  argTypes: {
    onSuccess: { action: "success" },
  },
};

export default meta;

const Template: StoryFn<AddDeckDialogProps> = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(args.loading);

  return (
    <>
      <Toaster />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <AddDeckDialog
          {...args}
          loading={loading}
          onClose={() => setIsOpen(false)}
          createDeck={async (...params) => {
            if (args.loading) return;
            try {
              setLoading(true);
              await args.createDeck(...params);
            } catch {
              throw new Error("Failed to create deck");
            } finally {
              setLoading(false);
            }
          }}
        />
      </Dialog>
    </>
  );
};

const delay = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

export const Default = Template.bind({});
Default.args = {
  createDeck: async () => {
    await delay();
  },
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const WithError = Template.bind({});
WithError.args = {
  createDeck: async () => {
    await delay();
    throw new Error("Failed to create deck");
  },
  loading: false,
};

export const WithSuccess = Template.bind({});
WithSuccess.args = {
  createDeck: async () => {
    await delay();
  },
  loading: false,
};
