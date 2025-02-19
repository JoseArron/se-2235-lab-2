import { Meta, StoryFn } from "@storybook/react";
import HomePage from "./HomePage";
import { UserContext, NotesContext } from "@/context/Contexts";
import { MemoryRouter } from "react-router-dom";
import { within, userEvent, expect } from "@storybook/test";
import { User } from "@/types/user.types";

import { NoteWithVideos } from "@/types/note.types";
import { Toaster } from "react-hot-toast";
import {
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
  MAX_TEXT_INPUT_LENGTH,
  MIN_TEXT_INPUT_LENGTH,
} from "@/utils/constants";

interface HomePageStoryArgs {
  user?: User;
  isUploading: boolean;
  notes: NoteWithVideos[];
}

const mockUser: User = {
  id: "123",
  username: "test",
  email: "abc@test.com",
};

const mockNotes: NoteWithVideos[] = [
  {
    id: "1",
    content: "abc",
    createdAt: new Date().toLocaleDateString(),
    title: "abcd",
    videos: [],
  },
  {
    id: "2",
    content: "123",
    createdAt: new Date().toLocaleDateString(),
    title: "321",
    videos: [],
  },
];

const meta: Meta<typeof HomePage> = {
  title: "Pages/HomePage",
  component: HomePage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Toaster />
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

const Template: StoryFn<HomePageStoryArgs> = (args) => {
  return (
    <UserContext.Provider value={{ user: args.user, setUser: () => {} }}>
      <NotesContext.Provider
        value={{
          isUploading: args.isUploading,
          setIsUploading: () => {},
          notes: args.notes,
          setNotes: () => {},
        }}
      >
        <HomePage />
      </NotesContext.Provider>
    </UserContext.Provider>
  );
};

const delay = async (ms: number): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const Default = Template.bind({});
Default.args = {
  user: mockUser,
  isUploading: false,
  notes: mockNotes,
};

export const LoadingUser = Template.bind({});
LoadingUser.args = {
  user: undefined,
  isUploading: false,
  notes: [],
};

export const UploadingNote = Template.bind({});
UploadingNote.args = {
  ...Default.args,
  isUploading: true,
};

export const InputNoText = Template.bind({});
InputNoText.args = {
  ...Default.args,
};

export const InputLessThanMinText = Template.bind({});
InputLessThanMinText.args = {
  ...Default.args,
};

export const InputMoreThanMaxText = Template.bind({});
InputMoreThanMaxText.args = {
  ...Default.args,
};

export const AcceptedTextInput = Template.bind({});
AcceptedTextInput.args = {
  ...Default.args,
};

export const SwitchToFileTab = Template.bind({});
SwitchToFileTab.args = {
  ...Default.args,
};

export const UploadNoFile = Template.bind({});
UploadNoFile.args = {
  ...Default.args,
};

export const UploadInvalidFileType = Template.bind({});
UploadInvalidFileType.args = {
  ...Default.args,
};

export const UploadAboveMaxSize = Template.bind({});
UploadAboveMaxSize.args = {
  ...Default.args,
};

export const UploadAboveMaxCount = Template.bind({});
UploadAboveMaxCount.args = {
  ...Default.args,
};

export const UploadValidFile = Template.bind({});
UploadValidFile.args = {
  ...Default.args,
};

InputNoText.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await delay(500);

  const button = canvas.getByRole("button", { name: "Upload" });
  await userEvent.click(button);

  await expect(
    canvas.getByText("You must enter some text"),
  ).toBeInTheDocument();
};

InputLessThanMinText.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByPlaceholderText("Write your notes here...");

  await userEvent.type(input, "a".repeat(MIN_TEXT_INPUT_LENGTH - 1));

  await delay(1000);

  const button = canvas.getByRole("button", { name: "Upload" });
  await userEvent.click(button);

  await expect(
    canvas.getByText("Input must be at least 50 characters"),
  ).toBeInTheDocument();
};

InputMoreThanMaxText.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = canvas.getByPlaceholderText("Write your notes here...");
  await userEvent.type(input, "a".repeat(MAX_TEXT_INPUT_LENGTH + 1));

  await delay(1000);

  const button = canvas.getByRole("button", { name: "Upload" });
  await userEvent.click(button);

  await expect(
    canvas.getByText("Input must be less than 4000 characters"),
  ).toBeInTheDocument();
};

AcceptedTextInput.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = await canvas.getByPlaceholderText("Write your notes here...");
  await userEvent.type(input, "a".repeat(MIN_TEXT_INPUT_LENGTH + 1));

  await delay(1000);

  const button = canvas.getByRole("button", { name: "Upload" });
  await userEvent.click(button);
};

SwitchToFileTab.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const fileTabButton = canvas.getByRole("file-tab-btn");
  await userEvent.click(fileTabButton);

  await delay(500);

  await expect(
    canvas.getByText("Drag and drop or click to upload files"),
  ).toBeInTheDocument();
};

UploadNoFile.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const fileTabButton = canvas.getByRole("file-tab-btn");
  await userEvent.click(fileTabButton);

  await delay(500);

  const button = canvas.getByRole("button", { name: "Upload" });
  await userEvent.click(button);

  await expect(
    canvas.getByText("You must upload a file first"),
  ).toBeInTheDocument();
};

UploadInvalidFileType.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const fileTabButton = canvas.getByRole("file-tab-btn");
  await userEvent.click(fileTabButton);

  const fileInput = canvas.getByRole("file-input");

  const invalidFile = new File(["Invalid file content"], "invalid-file.txt", {
    type: "text/csv",
  });

  await delay(500);

  await userEvent.upload(fileInput, invalidFile);

  await expect(
    canvas.getByText(
      "Invalid file type. Allowed types are JPG, PNG, PDF, DOC, DOCX, TXT",
    ),
  ).toBeInTheDocument();
};

UploadAboveMaxSize.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const fileTabButton = canvas.getByRole("file-tab-btn");
  await userEvent.click(fileTabButton);

  const fileInput = canvas.getByRole("file-input");

  const largeFile = new File(
    [new Blob(["a".repeat(MAX_FILE_SIZE + 1)])],
    "large-file.txt",
    {
      type: "text/plain",
    },
  );

  await delay(500);

  await userEvent.upload(fileInput, largeFile);

  await expect(
    canvas.getByText("Each file should not exceed 5 mb"),
  ).toBeInTheDocument();
};

UploadAboveMaxCount.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const fileTabButton = canvas.getByRole("file-tab-btn");
  await userEvent.click(fileTabButton);

  const fileInput = canvas.getByRole("file-input");

  const manyFiles = [];

  for (let index = 0; index <= MAX_FILE_COUNT; index++) {
    manyFiles.push(
      new File(["file"], `file-${index + 1}.txt`, {
        type: "text/plain",
      }),
    );
  }

  await delay(500);

  await userEvent.upload(fileInput, manyFiles);

  await expect(
    canvas.getByText("Only a maximum of 5 files are allowed"),
  ).toBeInTheDocument();
};

UploadValidFile.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const fileTabButton = canvas.getByRole("file-tab-btn");
  await userEvent.click(fileTabButton);

  const fileInput = canvas.getByRole("file-input");

  const validFile = new File(["hmm"], "valid-file.txt", {
    type: "text/plain",
  });

  await userEvent.upload(fileInput, validFile);

  await delay(500);

  const button = canvas.getByRole("button", { name: "Upload" });
  await userEvent.click(button);

  await delay(500);
};
