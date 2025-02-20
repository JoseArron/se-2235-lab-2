import { Meta, StoryFn } from "@storybook/react";
import VideoCard, { VideoCardProps } from "./VideoCard";

const meta: Meta<typeof VideoCard> = {
  title: "Components/Notes/VideoCard",
  component: VideoCard,
};

export default meta;

const Template: StoryFn<VideoCardProps> = (args) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      <VideoCard
        thumbnailUrl={args.thumbnailUrl}
        title={args.title}
        videoId={args.videoId}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  thumbnailUrl: "https://img.youtube.com/vi/bt8BwJs2JWI/0.jpg",
  title: "Can I remake those SH*TTY mobile games in 1 HOUR?",
  videoId: "bt8BwJs2JWI",
};

export const NoThumbnail = Template.bind({});
NoThumbnail.args = {
  thumbnailUrl: "",
  title: "Can I remake those SH*TTY mobile games in 1 HOUR?",
  videoId: "bt8BwJs2JWI",
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  thumbnailUrl: "https://img.youtube.com/vi/bt8BwJs2JWI/0.jpg",
  title: "",
  videoId: "bt8BwJs2JWI",
};

export const InvalidVideoId = Template.bind({});
InvalidVideoId.args = {
  thumbnailUrl: "https://img.youtube.com/vi/12345abc/0.jpg",
  title: "",
  videoId: "12345abc",
};

export const EmptyArguments = Template.bind({});
EmptyArguments.args = {
  thumbnailUrl: "",
  title: "",
  videoId: "",
};
