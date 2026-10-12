const createProduct = (
  id,
  slug,
  name,
  image,
  description,
  price,
  rating,
  category
) => ({
  id,
  slug,
  name,
  image,
  images: [image, image, image],
  description,
  price,
  rating,
  category,
});

const menuData = [
  // ==================== PIDE ====================
  {
    id: 1,
    slug: "cheese-pide",
    name: "Պանրով Փիդե",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6XQLVUHBSVrqwR1PsdC3Lpn8TKiyFucCKAFh5M7UgFUv9WpL4_vnhEv8&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6XQLVUHBSVrqwR1PsdC3Lpn8TKiyFucCKAFh5M7UgFUv9WpL4_vnhEv8&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6XQLVUHBSVrqwR1PsdC3Lpn8TKiyFucCKAFh5M7UgFUv9WpL4_vnhEv8&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6XQLVUHBSVrqwR1PsdC3Lpn8TKiyFucCKAFh5M7UgFUv9WpL4_vnhEv8&s=10",
    ],
    description: "Մոցարելլա, հայկական պանիր, կարագ",
    price: 3900,
    rating: 4.9,
    category: "Pide",
  },
  {
    id: 2,
    slug: "meat-pide",
    name: "Մսով Փիդե",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT2aYBympO6C6e-j_FR8YKsm7aMvH4KX5CkfraIsQg9A&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT2aYBympO6C6e-j_FR8YKsm7aMvH4KX5CkfraIsQg9A&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT2aYBympO6C6e-j_FR8YKsm7aMvH4KX5CkfraIsQg9A&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT2aYBympO6C6e-j_FR8YKsm7aMvH4KX5CkfraIsQg9A&s=10",
    ],
    description: "Տավարի միս, պանիր, լոլիկ",
    price: 4300,
    rating: 4.8,
    category: "Pide",
  },
  createProduct(
    7,
    "sujuk-pide",
    "Սուջուխով Փիդե",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    "Սուջուխ, պանիր, լոլիկի սոուս",
    4500,
    4.8,
    "Pide"
  ),
  createProduct(
    8,
    "chicken-pide",
    "Հավով Փիդե",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    "Հավի միս, պանիր, համեմունքներ",
    4200,
    4.7,
    "Pide"
  ),
  createProduct(
    9,
    "vegetable-pide",
    "Բանջարեղենային Փիդե",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    "Բուլղարական պղպեղ, լոլիկ, պանիր",
    3600,
    4.6,
    "Pide"
  ),
  createProduct(
    10,
    "mixed-cheese-pide",
    "Պանրային Տեսականիով Փիդե",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    "Մոցարելլա, ֆետա, հայկական պանիր",
    4600,
    4.9,
    "Pide"
  ),

  // ==================== BBQ ====================
  {
    id: 3,
    slug: "adana-kebab",
    name: "Ադանա Քեբաբ",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbmlHOBhwpT5Olg-AQwiQdDUBX80_XL7qfWeW3kXwRyocBv6HIuqs1kg&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbmlHOBhwpT5Olg-AQwiQdDUBX80_XL7qfWeW3kXwRyocBv6HIuqs1kg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbmlHOBhwpT5Olg-AQwiQdDUBX80_XL7qfWeW3kXwRyocBv6HIuqs1kg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbmlHOBhwpT5Olg-AQwiQdDUBX80_XL7qfWeW3kXwRyocBv6HIuqs1kg&s=10",
    ],
    description: "Աղացած միս, լավաշ, սոխ",
    price: 5200,
    rating: 5.0,
    category: "BBQ",
  },
  createProduct(
    11,
    "pork-khorovats",
    "Խոզի Խորոված",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    "Խոզի միս, սոխ, կանաչի",
    5800,
    4.9,
    "BBQ"
  ),
  createProduct(
    12,
    "chicken-khorovats",
    "Հավի Խորոված",
    "https://images.unsplash.com/photo-1532550907401-a500c9a57435",
    "Հավի միս, համեմունքներ, կանաչի",
    4200,
    4.8,
    "BBQ"
  ),
  createProduct(
    13,
    "beef-kebab",
    "Տավարի Քյաբաբ",
    "https://images.unsplash.com/photo-1544025162-d76694265947",
    "Տավարի աղացած միս, սոխ, համեմունքներ",
    4900,
    4.9,
    "BBQ"
  ),
  createProduct(
    14,
    "lamb-khorovats",
    "Գառան Խորոված",
    "https://images.unsplash.com/photo-1544025162-d76694265947",
    "Գառան միս, համեմունքներ, սոխ",
    7200,
    5.0,
    "BBQ"
  ),
  createProduct(
    15,
    "grilled-vegetables",
    "Խորոված Բանջարեղեն",
    "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    "Սմբուկ, պղպեղ, լոլիկ",
    2800,
    4.7,
    "BBQ"
  ),

  // ==================== SALADS ====================
  {
    id: 4,
    slug: "caesar",
    name: "Կեսար Աղցան",
    image: "https://buy.am/media/image/31/27/0a/f-60262.webp",
    images: [
      "https://buy.am/media/image/31/27/0a/f-60262.webp",
      "https://buy.am/media/image/31/27/0a/f-60262.webp",
      "https://buy.am/media/image/31/27/0a/f-60262.webp",
    ],
    description: "Հավ, պարմեզան, հազար",
    price: 3400,
    rating: 4.9,
    category: "Salad",
  },
  createProduct(
    16,
    "greek-salad",
    "Հունական Աղցան",
    "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    "Լոլիկ, վարունգ, ֆետա, ձիթապտուղ",
    2900,
    4.8,
    "Salad"
  ),
  createProduct(
    17,
    "armenian-salad",
    "Հայկական Աղցան",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    "Թարմ լոլիկ, վարունգ, կանաչի",
    2400,
    4.7,
    "Salad"
  ),
  createProduct(
    18,
    "chicken-salad",
    "Հավով Աղցան",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    "Հավի ֆիլե, բանջարեղեն, սոուս",
    3200,
    4.8,
    "Salad"
  ),
  createProduct(
    19,
    "vegetable-salad",
    "Թարմ Բանջարեղենային Աղցան",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    "Սեզոնային բանջարեղեն, կանաչի",
    2200,
    4.6,
    "Salad"
  ),

  // ==================== DRINKS ====================
  {
    id: 5,
    slug: "orange-juice",
    name: "Նարնջի Հյութ",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJfPT2ZoglNdsBjRuewH2fImv9Bt-Y1_AvIoEZLS9CON9oN5Cn0-d3eg&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJfPT2ZoglNdsBjRuewH2fImv9Bt-Y1_AvIoEZLS9CON9oN5Cn0-d3eg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJfPT2ZoglNdsBjRuewH2fImv9Bt-Y1_AvIoEZLS9CON9oN5Cn0-d3eg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJfPT2ZoglNdsBjRuewH2fImv9Bt-Y1_AvIoEZLS9CON9oN5Cn0-d3eg&s=10",
    ],
    description: "Թարմ քամած",
    price: 1800,
    rating: 4.7,
    category: "Drink",
  },
  createProduct(
    20,
    "pomegranate-juice",
    "Նռան Հյութ",
    "https://images.unsplash.com/photo-1546173159-315724a31696",
    "Մրգային հյութ",
    2200,
    4.9,
    "Drink"
  ),
  createProduct(
    21,
    "homemade-lemonade",
    "Տնական Լիմոնադ",
    "https://168.am/wp-content/uploads/2021/07/limonad_iz_tarhuna_limona_i_myati-410198.jpg",
    "Կիտրոն, անանուխ, սառույց",
    1600,
    4.8,
    "Drink"
  ),
  createProduct(
    22,
    "coffee",
    "Հայկական Սուրճ",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    "Թարմ պատրաստված սուրճ",
    900,
    4.8,
    "Drink"
  ),
  createProduct(
    23,
    "black-tea",
    "Սև Թեյ",
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
    "Բուրավետ տաք թեյ",
    800,
    4.6,
    "Drink"
  ),

  // ==================== DESSERTS ====================
  {
    id: 6,
    slug: "baklava",
    name: "Փախլավա",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLoNoNUHAfnKX59oTrxYG2tKuQ5Yb361-KtaTX-bOiPgL-E-k9EnFDk7I&s=10",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLoNoNUHAfnKX59oTrxYG2tKuQ5Yb361-KtaTX-bOiPgL-E-k9EnFDk7I&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLoNoNUHAfnKX59oTrxYG2tKuQ5Yb361-KtaTX-bOiPgL-E-k9EnFDk7I&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLoNoNUHAfnKX59oTrxYG2tKuQ5Yb361-KtaTX-bOiPgL-E-k9EnFDk7I&s=10",
    ],
    description: "Մեղր, ընկույզ",
    price: 2100,
    rating: 5,
    category: "Dessert",
  },
  createProduct(
    24,
    "armenian-gata",
    "Հայկական Գաթա",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    "Ավանդական քաղցր խմորեղեն",
    1700,
    4.9,
    "Dessert"
  ),
  createProduct(
    25,
    "chocolate-cake",
    "Շոկոլադե Տորթ",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    "Շոկոլադ, կրեմ, բիսկվիթ",
    2400,
    4.8,
    "Dessert"
  ),
  createProduct(
    26,
    "ice-cream",
    "Պաղպաղակ",
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    "Պաղպաղակ՝ ըստ առկա տեսականու",
    1400,
    4.7,
    "Dessert"
  ),

  // ==================== APPETIZERS ====================
  createProduct(
    27,
    "cheese-platter",
    "Պանրի Տեսականի",
    "https://images.unsplash.com/photo-1452195100486-9cc805987862",
    "Պանրի տարբեր տեսակներ և կանաչի",
    3600,
    4.9,
    "Appetizer"
  ),
  createProduct(
    28,
    "fresh-herbs",
    "Հայկական Կանաչեղեն",
    "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    "Թարմ կանաչի և սեզոնային բանջարեղեն",
    1500,
    4.7,
    "Appetizer"
  ),
  createProduct(
    29,
    "pickles",
    "Թթուների Տեսականի",
    "https://images.unsplash.com/photo-1472653525502-fc569e405a74",
    "Բանջարեղենային թթուների տեսականի",
    1800,
    4.6,
    "Appetizer"
  ),
  createProduct(
    30,
    "hummus",
    "Հումուս",
    "https://images.unsplash.com/photo-1577906096429-f73c2c312435",
    "Սիսեռ, թահին, կիտրոն, ձիթայուղ",
    2300,
    4.8,
    "Appetizer"
  ),
];

export default menuData;
