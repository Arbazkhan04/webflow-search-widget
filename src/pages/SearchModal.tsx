import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spinner,
  Flex,
  Box,
  Text,
  VStack,
  Divider,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";

const SearchModal = ({
  onClose,
  isOpen,
  searchResults,
  handleSearch,
  searchQuery,
  setSearchQuery,
  isLoading,
  instantSearchWidgetCustomization,
}) => {
  const handleInputChange = (e) => {
    const value = e.target.value || ""; // Default to empty string
    setSearchQuery(value);

    if (value.trim().length >= 3) {
      handleSearch(value.trim());
    }
  };

  const handleSearchButtonClick = () => {
    if ((searchQuery || "").trim().length >= 3) {
      handleSearch(searchQuery.trim());
    }
  };

  const isOneColumnLayout =
    instantSearchWidgetCustomization?.searchResultLayout === "one-column";

  return (
    <Modal onClose={onClose} size="6xl" isOpen={isOpen}>
      <ModalOverlay bg="rgba(0, 0, 0, 0.4)" backdropFilter="blur(5px)" />
      <ModalContent
        bg="rgba(255, 255, 255, 0.8)"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        boxShadow="lg"
        height="80vh"
        maxHeight="80vh"
        overflow="hidden"
      >
        <ModalHeader textAlign="center">Search</ModalHeader>
        <ModalBody p={4}>
          <Flex width="100%" mb={4} gap={2}>
            <Input
              value={searchQuery || ""}
              onChange={handleInputChange}
              placeholder="Search..."
              size="lg"
              bg="whiteAlpha.800"
              borderRadius="md"
            />
            <Button
              mt={1}
              colorScheme="blue"
              onClick={handleSearchButtonClick}
              isDisabled={(searchQuery || "").trim().length < 3}
            >
              Search
            </Button>
          </Flex>

          {isLoading && (
            <Spinner size="lg" thickness="4px" color="blue.500" mt={4} mb={4} />
          )}

          {!isLoading && searchResults.length > 0 ? (
            <Grid
              templateAreas={
                isOneColumnLayout
                  ? `"products"`
                  : `"products collections-pages"`
              }
              gridTemplateRows="1fr"
              gridTemplateColumns={isOneColumnLayout ? "1fr" : "2fr 1fr"}
              gap={6}
              mt={4}
              width="100%"
              height="calc(100% - 64px)"
            >
              {/* Left Section: Products */}
              <GridItem
                p={3}
                area="products"
                bg="whiteAlpha.700"
                borderRadius="md"
                boxShadow="sm"
                height="53vh"
                overflow="auto"
              >
                <VStack align="stretch" spacing={4} height="100%">
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="blue.600"
                    textTransform="uppercase"
                  >
                    Products
                  </Text>
                  <Divider borderColor="gray.300" />
                  <Box>
                    {searchResults
                      .find((category) => category.searchFrom === "Products")
                      ?.results.map((result, index) => (
                        <Flex
                          key={index}
                          bg="whiteAlpha.700"
                          p={4}
                          borderRadius="md"
                          boxShadow="sm"
                          _hover={{ boxShadow: "md", bg: "whiteAlpha.900" }}
                          cursor="pointer"
                          alignItems="center"
                          gap={4}
                          mb={2}
                        >
                          <Text fontWeight="medium">
                            {result?.fieldData?.name || "Unnamed Product"}
                          </Text>
                        </Flex>
                      ))}
                  </Box>
                  <Text
                    pb={4}
                    fontSize="sm"
                    fontWeight="bold"
                    color="blue.500"
                    textAlign="center"
                    cursor="pointer"
                    onClick={() => {
                      console.log("View all products clicked");
                    }}
                  >
                    View all products →
                  </Text>
                </VStack>
              </GridItem>

              {/* Right Section: Collections and Pages */}
              {!isOneColumnLayout && (
                <GridItem
                  p={3}
                  area="collections-pages"
                  bg="whiteAlpha.700"
                  borderRadius="md"
                  boxShadow="sm"
                  height="53vh"
                  overflow="auto"
                >
                  <VStack align="stretch" spacing={6}>
                    {/* Collections */}
                    <Box>
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="blue.600"
                        textTransform="uppercase"
                      >
                        Collections
                      </Text>
                      <Divider borderColor="gray.300" mb={2} />
                      {searchResults
                        .find(
                          (category) => category.searchFrom === "Collections"
                        )
                        ?.results.map((result, index) => (
                          <Text key={index} fontWeight="medium" mb={2}>
                            {result?.fieldData?.name || "Unnamed Collection"}
                          </Text>
                        ))}
                    </Box>

                    {/* Pages */}
                    <Box>
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="blue.600"
                        textTransform="uppercase"
                      >
                        Pages
                      </Text>
                      <Divider borderColor="gray.300" mb={2} />
                      {searchResults
                        .find((category) => category.searchFrom === "Pages")
                        ?.results.map((result, index) => (
                          <Text key={index} fontWeight="medium" mb={2}>
                            {result?.fieldData?.name || "Unnamed Page"}
                          </Text>
                        ))}
                    </Box>
                  </VStack>
                </GridItem>
              )}
            </Grid>
          ) : (
            !isLoading && (
              <Text mt={4} fontSize="lg" color="gray.500">
                No results found.
              </Text>
            )
          )}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} colorScheme="blue">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
