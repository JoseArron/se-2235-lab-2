import { UseFormReturn } from "react-hook-form";
import Dropzone from "react-dropzone";

import { Upload } from "lucide-react";

import { TabsContent } from "../ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";

import FileCard from "./FileCard";

import { cn } from "@/lib/utils";
import { MAX_FILE_COUNT, MAX_FILE_SIZE } from "@/utils/constants";
import formatBytes from "@/utils/formatBytes";
import arrayToFileList from "@/utils/arrayToFileList";

interface FileUploadTabProps {
  form: UseFormReturn<{
    files: FileList;
  }>;
  selectedFiles: FileList | null;
  onChange: (value: FileList) => void;
}

const FileUploadTab = ({
  form,
  selectedFiles,
  onChange,
}: FileUploadTabProps) => {
  return (
    <TabsContent value="files" className="w-full">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      const fileList = arrayToFileList(acceptedFiles);
                      field.onChange(fileList);
                      onChange(fileList);
                    }}
                  >
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div
                        {...getRootProps()}
                        className={cn(
                          "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          isDragActive && "border-muted-foreground/50",
                        )}
                      >
                        <input {...getInputProps()} role="file-input" />
                        {isDragActive ? (
                          <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                            <div className="rounded-full border border-dashed p-3">
                              <Upload
                                className="size-7 text-muted-foreground"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="font-medium text-muted-foreground">
                              Drop the files here
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                            <div className="rounded-full border border-dashed p-3">
                              <Upload
                                className="size-7 text-muted-foreground"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex flex-col gap-px">
                              <p className="font-medium text-muted-foreground">
                                Drag and drop or click to upload files
                              </p>
                              <p className="text-sm text-muted-foreground/70">
                                Max of {MAX_FILE_COUNT} files (up to{" "}
                                {formatBytes(MAX_FILE_SIZE, 0)} each)
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </FormControl>
                <FormMessage role="alert" className="dark:text-red-500" />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="h-36">
        {selectedFiles && (
          <ScrollArea className="h-full rounded-md">
            {[...selectedFiles].map((file, index) => (
              <FileCard
                key={index}
                file={file}
                onDelete={() => {
                  const newFiles = [...selectedFiles].filter((f) => {
                    return f !== file;
                  });
                  onChange(arrayToFileList(newFiles));
                }}
              />
            ))}
          </ScrollArea>
        )}
      </div>
    </TabsContent>
  );
};

export default FileUploadTab;
