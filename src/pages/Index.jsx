import React, { useState } from "react";
import { Box, Button, Flex, Grid, Heading, Image, Input, Select, Text, VStack } from "@chakra-ui/react";
import { FaShoppingCart, FaSearch, FaStore } from "react-icons/fa";

const Index = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const stores = [
    { id: 1, name: "Clothing Co.", template: "modern" },
    { id: 2, name: "Fragrance Hub", template: "elegant" },
    { id: 3, name: "Furniture Mart", template: "rustic" },
  ];

  const storeTemplates = {
    modern: {
      bg: "gray.100",
      color: "black",
      headerBg: "blue.500",
      headerColor: "white",
    },
    elegant: {
      bg: "white",
      color: "gray.800",
      headerBg: "purple.500",
      headerColor: "white",
    },
    rustic: {
      bg: "orange.100",
      color: "brown",
      headerBg: "green.700",
      headerColor: "white",
    },
  };

  const openStore = (store) => {
    setSelectedStore(store);
    // Fetch store products from API
    setProducts([
      {
        id: 1,
        name: "Product 1",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1608571423539-e951b9b3871e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG98ZW58MHx8fHwxNzEwOTQwMTYxfDA&ixlib=rb-4.0.3&q=80&w=1080",
      },
      {
        id: 2,
        name: "Product 2",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1545289414-1c3cb1c06238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxwcm9kdWN0JTIwcGhvdG98ZW58MHx8fHwxNzEwOTQwMTYxfDA&ixlib=rb-4.0.3&q=80&w=1080",
      },
    ]);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Box>
      <Flex align="center" justify="space-between" p={4} bg="gray.200">
        <Heading size="xl">Multi-Vendor Marketplace</Heading>
        <Flex align="center">
          <Input placeholder="Search products..." bg="white" mr={2} />
          <Button colorScheme="blue" leftIcon={<FaSearch />}>
            Search
          </Button>
          <Button ml={4} colorScheme="green" leftIcon={<FaShoppingCart />}>
            Cart ({cart.length})
          </Button>
        </Flex>
      </Flex>

      {!selectedStore && (
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={8} m={8}>
          {stores.map((store) => (
            <Box key={store.id} borderWidth={1} borderRadius="lg" p={4} bg={storeTemplates[store.template].bg} color={storeTemplates[store.template].color} cursor="pointer" onClick={() => openStore(store)}>
              <Flex align="center" mb={4}>
                <FaStore fontSize="2xl" />
                <Heading ml={2} size="lg">
                  {store.name}
                </Heading>
              </Flex>
              <Image src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzdG9yZSUyMGludGVyaW9yfGVufDB8fHx8MTcxMDk0MDE2Mnww&ixlib=rb-4.0.3&q=80&w=1080" mb={4} />
              <Text>Click to enter store</Text>
            </Box>
          ))}
        </Grid>
      )}

      {selectedStore && (
        <VStack spacing={8} m={8}>
          <Flex w="100%" p={4} bg={storeTemplates[selectedStore.template].headerBg} color={storeTemplates[selectedStore.template].headerColor} align="center" justify="space-between">
            <Heading size="xl">{selectedStore.name}</Heading>
            <Select placeholder="Sort by">
              <option value="price_low_to_high">Price: Low to High</option>
              <option value="price_high_to_low">Price: High to Low</option>
            </Select>
          </Flex>

          <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={8}>
            {products.map((product) => (
              <Box key={product.id} borderWidth={1} borderRadius="lg" p={4} bg="white">
                <Image src={product.image} mb={4} />
                <Heading size="md" mb={2}>
                  {product.name}
                </Heading>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                  ${product.price}
                </Text>
                <Button colorScheme="blue" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </Box>
            ))}
          </Grid>

          <Button onClick={() => setSelectedStore(null)} leftIcon={<FaStore />}>
            Back to Stores
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Index;
