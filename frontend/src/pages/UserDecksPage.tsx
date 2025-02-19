import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header/Header";
import DeckItem from "../components/Decks/DeckItem";
import LoadingScreen from "../components/LoadingScreen";
import { Toaster } from "react-hot-toast";
import NoItemsContainerBox from "../components/NoItemsContainerBox";
import { options } from "../types/options.types";
import { Deck, DeckEntity } from "../types/deck.types";
import AddDeckDrawer from "../components/Decks/AddDeckDrawer";
import AddDeckDialog from "@/components/Decks/AddDeckDialog";
import { UserContext, DecksContext } from "@/context/Contexts";
import { useIsMobile } from "@/hooks/use-mobile";

import { Drawer } from "@/components/ui/drawer";
import { Dialog } from "@/components/ui/dialog";
import applySortingAndFilteringToDecks from "@/utils/decksSorterFilter";
import useCreateDeck from "@/hooks/Decks/useCreateDeck";
import generateRandomColor from "@/utils/generateRandomColor";

const UserDecksPage: React.FC = () => {
  const { user } = useContext(UserContext);
  const isMobile = useIsMobile();

  const { decks: userDecks } = useContext(DecksContext);
  const [displayedDecks, setDisplayedDecks] = useState<Deck[] | null>(null);

  const [isAddDeckDrawerOpen, setIsAddDeckDrawerOpen] = useState(false);
  const [isAddDeckDialogOpen, setIsAddDeckDialogOpen] = useState(false);

  const [filterOptions, setFilterOptions] = useState<options>({
    sortByNames: "",
    sortByDate: "latest",
    searchByName: "",
  });

  const { createDeck, loading: createDeckLoading } = useCreateDeck();

  useEffect(() => {
    if (userDecks)
      setDisplayedDecks(
        applySortingAndFilteringToDecks(userDecks, filterOptions),
      );
  }, [filterOptions, userDecks]);

  if (!user || !userDecks) {
    return <LoadingScreen message="Loading decks..." />;
  }

  const toggleAddDeck = () => {
    if (isMobile) setIsAddDeckDrawerOpen((prev) => !prev);
    else setIsAddDeckDialogOpen((prev) => !prev);
  };

  const handleFormSuccess = () => {
    setIsAddDeckDrawerOpen(false);
  };

  const handleApplyFilters = (newOptions: options) => {
    setFilterOptions(newOptions);
  };

  const handleSearch = (searchText: string) => {
    setFilterOptions((prev) => ({
      ...prev,
      searchByName: searchText,
    }));
  };

  const handleCreateDeck = async (deckName: string) => {
    const selectedColor = generateRandomColor();

    const result = await createDeck({
      id: "",
      deck_name: deckName.trim(),
      user_id: user.id!,
      color: selectedColor,
      card_count: 0,
    });

    if (result.error) {
      throw new Error(result.error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="overflow-auto pb-4 h-screen w-full relative bg-white dark:bg-dark-background flex flex-col items-center scrollbar-custom">
        <Header
          isHomepage={false}
          isFlashCardsPage={false}
          isSectionTitleOnly={false}
          hasAddButton={true}
          sectionTitle="My Decks"
          onAdd={toggleAddDeck}
          onApplyOptions={handleApplyFilters}
          onSearch={handleSearch}
        />

        <Dialog
          open={isAddDeckDialogOpen}
          onOpenChange={setIsAddDeckDialogOpen}
        >
          <AddDeckDialog
            onClose={() => setIsAddDeckDialogOpen(false)}
            onSuccess={handleFormSuccess}
            createDeck={handleCreateDeck}
            loading={createDeckLoading}
          />
        </Dialog>

        <Drawer
          open={isAddDeckDrawerOpen}
          onOpenChange={setIsAddDeckDrawerOpen}
        >
          <AddDeckDrawer
            userId={user.id!}
            onClose={() => setIsAddDeckDrawerOpen(false)}
            onSuccess={handleFormSuccess}
          />
        </Drawer>

        {displayedDecks?.length === 0 ? (
          <div className="pt-5">
            <NoItemsContainerBox
              mainText="No decks available"
              subText="Add a deck using the + Add Deck button."
              imageSrc="../chillguy.png"
              altText="No Cards Available"
            />
          </div>
        ) : (
          <div
            className={`w-[90%] gap-4 pb-4 flex flex-col md:grid xs:grid-cols-1 sm:grid-cols-1 sm-md:grid-cols-1 md:grid-cols-2 md-lg:grid-cols-3 lg:grid-cols-3 lg-xl:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-5 4k:grid-cols-5 xxl:grid-cols-5 auto-cols-auto`}
          >
            {displayedDecks?.map((deck: DeckEntity) => (
              <DeckItem
                key={deck.id}
                id={deck.id}
                deckName={deck.deck_name}
                cardCount={deck.card_count}
                userId={deck.user_id}
                color={deck.color}
                createdAt={deck.created_at!}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserDecksPage;
