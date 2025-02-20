import React, { useState } from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Play } from "lucide-react";

export interface VideoCardProps {
  videoId: string;
  thumbnailUrl: string;
  title: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  videoId,
  thumbnailUrl,
  title,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div
        className="group cursor-pointer rounded-lg w-full overflow-hidden shadow-md dark:bg-dark-foreground hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        onClick={() => setIsVideoOpen(true)}
      >
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={thumbnailUrl}
            alt={title}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="bg-white dark:bg-dark-foreground px-4 py-3">
          <HoverCard>
            <HoverCardTrigger asChild>
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2">
                {title}
              </h3>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {title}
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] p-0">
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 rounded-lg w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <DialogClose asChild>
            <Button
              className="absolute top-2 right-2 rounded-full p-2"
              variant="ghost"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoCard;
