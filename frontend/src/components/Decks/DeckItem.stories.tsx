import { Meta, StoryFn } from "@storybook/react";
import DeckItem from "./DeckItem";
import type { Deck } from "../../types/deck.types";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof DeckItem> = {
  title: "Components/Decks/DeckItem",
  component: DeckItem,
};

export default meta;

const Template: StoryFn<Deck> = (args) => {
  return (
    <MemoryRouter>
      <div
        className={`w-[90%] gap-4 pb-4 flex flex-col md:grid xs:grid-cols-1 sm:grid-cols-1 sm-md:grid-cols-1 md:grid-cols-2 md-lg:grid-cols-3 lg:grid-cols-3 lg-xl:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-5 4k:grid-cols-5 xxl:grid-cols-5 auto-cols-auto`}
      >
        <DeckItem
          id={args.id}
          deckName={args.deckName}
          cardCount={args.cardCount}
          userId={args.userId}
          color={args.color}
          createdAt={args.createdAt!}
        />
      </div>
    </MemoryRouter>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: "0",
  deckName: "Default",
  userId: "Default",
  cardCount: 24,
  color: "red",
  createdAt: "Default",
};

export const NoCards = Template.bind({});
NoCards.args = {
  id: "0",
  deckName: "Default",
  userId: "Default",
  cardCount: 0,
  color: "red",
  createdAt: "Default",
};

export const NoColor = Template.bind({});
NoColor.args = {
  id: "0",
  deckName: "Default",
  userId: "Default",
  cardCount: 24,
  color: "",
  createdAt: "Default",
};

export const NoName = Template.bind({});
NoName.args = {
  id: "0",
  deckName: "",
  userId: "Default",
  cardCount: 24,
  color: "red",
  createdAt: "Default",
};
