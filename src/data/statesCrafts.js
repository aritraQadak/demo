/**
 * KARIGAR Artisanal Heritage Platform
 * Complete Cartography & Craft Taxonomy for 28 States + 8 Union Territories
 */

export const REGIONS = [
  'North',
  'South',
  'East',
  'West',
  'Central',
  'Northeast',
  'Union Territory'
];

export const CRAFT_TYPES = [
  'Handloom & Textiles',
  'Embroidery',
  'Painting & Folk Art',
  'Wood',
  'Metal',
  'Pottery/Clay',
  'Jewellery',
  'Natural Fibre',
  'Leather',
  'Special/Other'
];

export const STATES_CRAFTS = [
  // --- NORTH ---
  {
    name: 'Haryana',
    slug: 'haryana',
    region: 'North',
    description: 'Land of sacred looms, intricate Phulkari embroidery weaves, and ancient terracotta metalworks.',
    crafts: [
      { category: 'Embroidery', items: ['Phulkari Hand Embroidery', 'Bagh Needlework'] },
      { category: 'Pottery/Clay', items: ['Jhajjar Earthenware Potters', 'Rohtak Terracotta'] },
      { category: 'Handloom & Textiles', items: ['Panipat Durries', 'Khes Weaving'] }
    ]
  },
  {
    name: 'Himachal Pradesh',
    slug: 'himachal-pradesh',
    region: 'North',
    description: 'High-altitude Himalayan weaves, famed Kullu shawls, Chamba rumals, and intricate wood carving traditions.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Kullu Patterned Shawls', 'Kinnauri Woollen Shawls', 'Pattu Weaving'] },
      { category: 'Embroidery', items: ['Chamba Rumal Double-Sided Needlework'] },
      { category: 'Metal', items: ['Chamba Brass & Copper Temple Metalwork'] },
      { category: 'Wood', items: ['Himachali Carved Teak & Pine Architectural Panels'] }
    ]
  },
  {
    name: 'Punjab',
    slug: 'punjab',
    region: 'North',
    description: 'Vibrant land of golden Phulkari gardens, handcrafted Jutti footwear, and royal brass inlay crafts.',
    crafts: [
      { category: 'Embroidery', items: ['Phulkari & Chope Heritage Needlework'] },
      { category: 'Leather', items: ['Tilla Hand-Embroidered Punjabi Juttis'] },
      { category: 'Metal', items: ['Jandiala Guru Thatheras Brassware (UNESCO)'] },
      { category: 'Wood', items: ['Hoshiarpur Wood & Bone Inlay Craft'] }
    ]
  },
  {
    name: 'Rajasthan',
    slug: 'rajasthan',
    region: 'North',
    description: 'Royal desert kingdom celebrated for Jaipur Blue Pottery, Ajrakh & Dabu block prints, and Marwar miniature painting.',
    crafts: [
      { category: 'Pottery/Clay', items: ['Jaipur Quartz Blue Pottery', 'Molela Terracotta Plaques'] },
      { category: 'Handloom & Textiles', items: ['Kota Doria Zari Sarees', 'Bandhani Tie-Dye Muslin', 'Bagru & Dabu Woodblock Prints'] },
      { category: 'Painting & Folk Art', items: ['Pichwai Temple Wall Art', 'Kishangarh & Marwar Miniatures', 'Phad Scroll Painting'] },
      { category: 'Leather', items: ['Mojari Hand-Stitched Leather Footwear'] },
      { category: 'Jewellery', items: ['Meenakari Enamel & Kundan Jewellery'] }
    ]
  },
  {
    name: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    region: 'North',
    description: 'Sacred cradle of Banarasi brocade weaves, delicate Chikankari white needlecraft, and Firozabad glass art.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Banarasi Katan Silk & Zari Brocade', 'Tanda Handloom Fabrics'] },
      { category: 'Embroidery', items: ['Lucknow Chikankari Needlework', 'Zardozi Gold Filament Embroidery'] },
      { category: 'Metal', items: ['Moradabad Engraved Brassware', 'Aligarh Brass Craft'] },
      { category: 'Wood', items: ['Saharanpur Carved Sheesham Woodcraft'] },
      { category: 'Special/Other', items: ['Kannauj Natural Attar Perfumery', 'Firozabad Glassware'] }
    ]
  },
  {
    name: 'Uttarakhand',
    slug: 'uttarakhand',
    region: 'North',
    description: 'Alpine sanctuary of Aipan geometric floor frescoes, Ringal bamboo weaving, and Himalayan sheep wool blankets.',
    crafts: [
      { category: 'Painting & Folk Art', items: ['Aipan Sacred Geometric Frescoes', 'Garhwal Miniature Paintings'] },
      { category: 'Natural Fibre', items: ['Ringal Bamboo Weaving', 'Nettle Fibre Textiles'] },
      { category: 'Handloom & Textiles', items: ['Pankhi Woollen Blankets', 'Thulma Heavy Weaves'] },
      { category: 'Wood', items: ['Likhai Traditional Carved Wooden Doorways'] }
    ]
  },

  // --- SOUTH ---
  {
    name: 'Andhra Pradesh',
    slug: 'andhra-pradesh',
    region: 'South',
    description: 'Home of ancient Kalamkari freehand pen paintings, Mangalagiri cotton weaves, and Kondapalli wooden toys.',
    crafts: [
      { category: 'Painting & Folk Art', items: ['Srikalahasti Freehand Kalamkari', 'Pedana Block Printed Textiles'] },
      { category: 'Handloom & Textiles', items: ['Mangalagiri Zari Cotton Sarees', 'Uppada Jamdani Silk', 'Dharmavaram Silk'] },
      { category: 'Wood', items: ['Kondapalli Softwood Toys', 'Etikoppaka Lacquer-Turned Woodenware'] },
      { category: 'Metal', items: ['Budhiti Brass & Bell Metal Craft'] }
    ]
  },
  {
    name: 'Karnataka',
    slug: 'karnataka',
    region: 'South',
    description: 'State of imperial Mysore Crepe silks, fragrant Sandalwood carvings, Bidriware metal inlay, and Channapatna toys.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Mysore Crepe Pure Silk', 'Ilkal Border Weave Sarees', 'Guledgudd Khana Fabrics'] },
      { category: 'Metal', items: ['Bidriware Zinc-Copper Silver Inlay'] },
      { category: 'Wood', items: ['Channapatna Lacquer Toys', 'Mysore Rosewood Inlay', 'Sandalwood Carvings'] },
      { category: 'Embroidery', items: ['Kasuti Thread Embroidery'] }
    ]
  },
  {
    name: 'Kerala',
    slug: 'kerala',
    region: 'South',
    description: 'God\'s own country famed for Kasavu gold-bordered muslins, Aranmula metal mirrors, and coconut shell crafts.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Balaramapuram Kasavu Gold Saree', 'Kutampully Handloom Textiles'] },
      { category: 'Metal', items: ['Aranmula Kannadi Pure Metal Alloy Mirror', 'Payyannur Bell Metal Bells'] },
      { category: 'Natural Fibre', items: ['Coir Door Mats & Fibre Tapestries', 'Screwpine Leaf Mats'] },
      { category: 'Wood', items: ['Nettur Petti Wooden Keepsake Boxes', 'Kathakali Wooden Masks'] }
    ]
  },
  {
    name: 'Tamil Nadu',
    slug: 'tamil-nadu',
    region: 'South',
    description: 'Dravidian sanctuary of lustrous Kanchipuram silk temple weaves, Tanjore gold leaf paintings, and Swamimalai bronze icons.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Kanchipuram Heavy Silk Sarees', 'Madurai Sungudi Tie-Dye', 'Chettinad Cotton Sarees', 'Toda Tribal Embroidery'] },
      { category: 'Metal', items: ['Swamimalai Chola Bronze Castings', 'Nachiyar Kovil Brass Lamps'] },
      { category: 'Painting & Folk Art', items: ['Tanjore Gold Leaf Reliquary Paintings'] },
      { category: 'Wood', items: ['Tanjore Wooden Veena Musical Instruments', 'Pathamadai Mat Weaving'] }
    ]
  },
  {
    name: 'Telangana',
    slug: 'telangana',
    region: 'South',
    description: 'Land of geometric Pochampally Ikat textiles, Pembarthi sheet metalware, and Cheriyal scroll paintings.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Pochampally Double Ikat', 'Gadwal Silk & Cotton Sarees', 'Gollabama Sarees'] },
      { category: 'Metal', items: ['Pembarthi Embossed Brassware'] },
      { category: 'Painting & Folk Art', items: ['Cheriyal Nakashi Scroll Paintings'] },
      { category: 'Wood', items: ['Nirmal Painted Furniture & Toys'] }
    ]
  },

  // --- EAST ---
  {
    name: 'Bihar',
    slug: 'bihar',
    region: 'East',
    description: 'Ancient crucible of Mithila Madhubani folk paintings, Bhagalpuri wild tussar silk, and Sikki grass crafts.',
    crafts: [
      { category: 'Painting & Folk Art', items: ['Madhubani / Mithila Fresco & Canvas Art', 'Manjusha Scroll Art'] },
      { category: 'Handloom & Textiles', items: ['Bhagalpuri Tussar & Matka Silk', 'Bawan Butti Cotton Weaves'] },
      { category: 'Natural Fibre', items: ['Sikki Golden Grass Baskets & Decor'] },
      { category: 'Special/Other', items: ['Tikuli Glass Enamel Painting', 'Khatwa Patchwork Applique'] }
    ]
  },
  {
    name: 'Jharkhand',
    slug: 'jharkhand',
    region: 'East',
    description: 'Forest realm of Sohrai Khovar tribal mural art, Kuchai Tussar silk, and brass Dhokra metal casting.',
    crafts: [
      { category: 'Painting & Folk Art', items: ['Sohrai & Khovar Cave Mural Art', 'Jadopatia Tribal Scrolls'] },
      { category: 'Metal', items: ['Dhokra Lost-Wax Brass Figurines'] },
      { category: 'Handloom & Textiles', items: ['Kuchai Organic Tussar Silk'] },
      { category: 'Natural Fibre', items: ['Bamboo & Sabai Grass Baskets'] }
    ]
  },
  {
    name: 'Odisha',
    slug: 'odisha',
    region: 'East',
    description: 'Maritime heritage land of Sambalpuri Ikat handlooms, Raghurajpur Pattachitra palm-leaf scrolls, and Silver Filigree.',
    crafts: [
      { category: 'Painting & Folk Art', items: ['Raghurajpur Pattachitra Palm Leaf Scrolls', 'Jhoti Chita Folk Frescoes'] },
      { category: 'Handloom & Textiles', items: ['Sambalpuri Bandha Double Ikat', 'Bomkai & Pasapalli Silk Sarees', 'Kotpad Tribal Natural Dye Weaves'] },
      { category: 'Jewellery', items: ['Cuttack Tarakasi Silver Filigree'] },
      { category: 'Pottery/Clay', items: ['Terracotta Ritual Pottery'] }
    ]
  },
  {
    name: 'West Bengal',
    slug: 'west-bengal',
    region: 'East',
    description: 'Cultural bastion of narrative Nakshi Kantha embroideries, gossamer Jamdani muslins, Bankura terracotta, and Shantiniketan leather.',
    crafts: [
      { category: 'Embroidery', items: ['Nakshi Kantha Narrative Stitching', 'Sujani Needlework'] },
      { category: 'Handloom & Textiles', items: ['Dhakai & Shantipur Jamdani Muslin', 'Baluchari & Swarnachari Mythological Silk', 'Tangail Handloom Sarees'] },
      { category: 'Pottery/Clay', items: ['Bankura Panchmura Terracotta Horses', 'Krishnanagar Clay Sculptures'] },
      { category: 'Leather', items: ['Shantiniketan Embossed Goatskin Leathercraft'] },
      { category: 'Wood', items: ['Natungram Carved Wooden Dolls'] }
    ]
  },

  // --- WEST ---
  {
    name: 'Goa',
    slug: 'goa',
    region: 'West',
    description: 'Coastal haven of Kunbi handloom sarees, Portuguese azulejo hand-painted tiles, and sea shell craft.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Kunbi Red-Grid Tribal Saree'] },
      { category: 'Painting & Folk Art', items: ['Goan Azulejo Ceramic Tile Painting'] },
      { category: 'Natural Fibre', items: ['Coconut Shell Carving & Fibre Crafts'] },
      { category: 'Pottery/Clay', items: ['Bicholim Terracotta Earthenware'] }
    ]
  },
  {
    name: 'Gujarat',
    slug: 'gujarat',
    region: 'West',
    description: 'Vibrant western peninsula famed for Patan Patola double ikat, Ajrakh block prints, Kutch mirror embroidery, and Rogan art.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Patan Patola Double Ikat', 'Ajrakh 16-Stage Block Prints', 'Tangaliya Warp-Tufted Fabrics', 'Ashavali Brocade'] },
      { category: 'Embroidery', items: ['Kutch Rabari & Mutwa Mirrorwork', 'Suf Embroidery', 'Aari Needlework'] },
      { category: 'Painting & Folk Art', items: ['Nirona Rogan Castor Oil Paint Art', 'Pithora Tribal Frescoes'] },
      { category: 'Pottery/Clay', items: ['Khavda Slip-Painted Terracotta Pottery'] },
      { category: 'Wood', items: ['Sankheda Lacquered Wooden Furniture'] }
    ]
  },
  {
    name: 'Maharashtra',
    slug: 'maharashtra',
    region: 'West',
    description: 'Kingdom of royal Paithani peacock border silk sarees, Warli tribal rice paste art, and Kolhapuri leather chappals.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Paithani Pure Gold Zari Silk Saree', 'Karvath Kati Tussar Sarees'] },
      { category: 'Painting & Folk Art', items: ['Warli Tribal Charcoal & Rice Fresco Painting', 'Pinguli Chitrakathi Puppets'] },
      { category: 'Leather', items: ['Kolhapuri Hand-Braided Leather Footwear'] },
      { category: 'Metal', items: ['Bida Metalware & Copper Craft of Kalyan'] }
    ]
  },

  // --- CENTRAL ---
  {
    name: 'Chhattisgarh',
    slug: 'chhattisgarh',
    region: 'Central',
    description: 'Heartland of ancient Bastar Dhokra bell metal casting, iron craft, and Kosa wild silkworm weaves.',
    crafts: [
      { category: 'Metal', items: ['Bastar Dhokra Lost-Wax Bell Metal Casting', 'Loha Shilpa Forged Iron Sculptures'] },
      { category: 'Handloom & Textiles', items: ['Kosa Wild Tussar Silk Weaving'] },
      { category: 'Wood', items: ['Bastar Tribal Carved Wood Totems'] },
      { category: 'Pottery/Clay', items: ['Terracotta Roof Tile Figurines'] }
    ]
  },
  {
    name: 'Madhya Pradesh',
    slug: 'madhya-pradesh',
    region: 'Central',
    description: 'Central citadel of Chanderi tissue silks, Maheshwari weaves, Gond tribal art, and Bagh vegetable block printing.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Chanderi Gold Foil Silk-Cotton', 'Maheshwari Reversible Zari Border Saree', 'Bagh Natural Dye Block Print'] },
      { category: 'Painting & Folk Art', items: ['Gond Dot & Patterned Tribal Painting', 'Pithora Ritual Canvas'] },
      { category: 'Metal', items: ['Tikamgarh Brass & Bronze Craft', 'Bhitarganj Metal Casting'] },
      { category: 'Wood', items: ['Gwalior Carved Wood Lattice Jali Works'] }
    ]
  },

  // --- NORTHEAST ---
  {
    name: 'Arunachal Pradesh',
    slug: 'arunachal-pradesh',
    region: 'Northeast',
    description: 'Himalayan tribal frontier of Monpa wood carving, Sherdukpen geometric weaves, and cane masks.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Monpa & Adi Geometric Tribal Weaves', 'Apatani Jacket Tapestries'] },
      { category: 'Wood', items: ['Monpa Buddhist Mask Carving & Wooden Bowls'] },
      { category: 'Natural Fibre', items: ['Cane & Bamboo Tribal Backpacks and Hats'] }
    ]
  },
  {
    name: 'Assam',
    slug: 'assam',
    region: 'Northeast',
    description: 'Valley of golden Muga silk, white Eri ahimsa silk, Sualkuchi looms, and intricate cane-bamboo craft.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Sualkuchi Golden Muga Silk Mekhela Chador', 'Eri Ahimsa Silk', 'Meghdoot Cotton Weaves'] },
      { category: 'Natural Fibre', items: ['Assamese Bamboo & Cane Jaapi & Furniture'] },
      { category: 'Metal', items: ['Sarthebari Bell Metal Utensils & Xorai'] },
      { category: 'Wood', items: ['Majuli Vaishnavite Wooden & Clay Masks'] }
    ]
  },
  {
    name: 'Manipur',
    slug: 'manipur',
    region: 'Northeast',
    description: 'Land of Shaphee Lanphee royal shawls, Longpi black earthenware pottery, and Kauna reed basketry.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Shaphee Lanphee Embroidered Royal Shawls', 'Moirang Phee Saree', 'Phanek Tribal Skirts'] },
      { category: 'Pottery/Clay', items: ['Longpi Serpentinite & Clay Black Pottery'] },
      { category: 'Natural Fibre', items: ['Kauna Water Reed Baskets & Cushioning'] }
    ]
  },
  {
    name: 'Meghalaya',
    slug: 'meghalaya',
    region: 'Northeast',
    description: 'Abode of clouds celebrated for Ryndia organic Eri silk, Khasi cane weaving, and bamboo rainshields.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Ryndia Organic Plant-Dyed Eri Silk'] },
      { category: 'Natural Fibre', items: ['Khasi Tlieng Cane Mat Weaving', 'Knup Bamboo Rainshields'] },
      { category: 'Wood', items: ['Garo Carved Wooden Instruments'] }
    ]
  },
  {
    name: 'Mizoram',
    slug: 'mizoram',
    region: 'Northeast',
    description: 'Hill state of intricate Puan woven textiles, bamboo dance props, and natural cane baskets.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Puanchei & Tawlhlohpuan Traditional Textiles'] },
      { category: 'Natural Fibre', items: ['Mizo Bamboo Craft & Fine Cane Baskets'] }
    ]
  },
  {
    name: 'Nagaland',
    slug: 'nagaland',
    region: 'Northeast',
    description: 'Realm of Naga tribal warrior shawls, intricate glass beadwork jewellery, and spear woodcarvings.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Ao & Angami Naga Tribal Shawls', 'Chakhesang Loin Loom Weaves'] },
      { category: 'Jewellery', items: ['Naga Glass & Dog-Tooth Tribal Bead Necklaces'] },
      { category: 'Wood', items: ['Naga Tribal Carved Door Panels & Drinking Horns'] },
      { category: 'Natural Fibre', items: ['Konyak Bamboo & Cane Baskets'] }
    ]
  },
  {
    name: 'Sikkim',
    slug: 'sikkim',
    region: 'Northeast',
    description: 'Highland kingdom of Lepcha handloom weaves, Thangka Buddhist canvas painting, and Choktse tables.',
    crafts: [
      { category: 'Painting & Folk Art', items: ['Thangka Sacred Mineral Pigment Scroll Painting'] },
      { category: 'Wood', items: ['Choktse Foldable Carved Wooden Tables'] },
      { category: 'Handloom & Textiles', items: ['Lepcha Handloom Weaving', 'Bhutia Woollen Carpets'] }
    ]
  },
  {
    name: 'Tripura',
    slug: 'tripura',
    region: 'Northeast',
    description: 'Land of Rignai tribal looms, delicate bamboo umbrella handles, and cane lamp shades.',
    crafts: [
      { category: 'Natural Fibre', items: ['Tripura Fine Bamboo Split Screen & Furniture', 'Cane Lamp Shades'] },
      { category: 'Handloom & Textiles', items: ['Rignai & Risa Traditional Tribal Wrap Textiles'] }
    ]
  },

  // --- UNION TERRITORIES ---
  {
    name: 'Andaman & Nicobar Islands',
    slug: 'andaman-nicobar',
    region: 'Union Territory',
    description: 'Tropical archipelago known for Nicobari coconut shell carving, padauk woodcraft, and shell jewellery.',
    crafts: [
      { category: 'Natural Fibre', items: ['Nicobari Coconut Shell Carving & Matting'] },
      { category: 'Jewellery', items: ['Mother of Pearl Shell Accessories'] },
      { category: 'Wood', items: ['Andaman Padauk Woodcraft'] }
    ]
  },
  {
    name: 'Chandigarh',
    slug: 'chandigarh',
    region: 'Union Territory',
    description: 'Modernist garden city showcasing Punjabi heritage Phulkari and architectural pottery crafts.',
    crafts: [
      { category: 'Embroidery', items: ['Phulkari Threadwork Tapestries'] },
      { category: 'Pottery/Clay', items: ['Garden Terracotta Sculptures'] }
    ]
  },
  {
    name: 'Dadra & Nagar Haveli and Daman & Diu',
    slug: 'daman-diu-dadra',
    region: 'Union Territory',
    description: 'Coastal enclave famed for Warli tribal mural paintings and tortoise shell crafts.',
    crafts: [
      { category: 'Painting & Folk Art', items: ['Warli Tribal Rice Paste Paintings'] },
      { category: 'Natural Fibre', items: ['Palm Leaf Weaving & Shell Craft'] }
    ]
  },
  {
    name: 'Delhi',
    slug: 'delhi',
    region: 'Union Territory',
    description: 'Capital metropolis preserving Mughal Zardozi embroidery, meenakari jewellery, and paper mache heritage.',
    crafts: [
      { category: 'Embroidery', items: ['Old Delhi Zardozi & Gota Patti Needlework'] },
      { category: 'Jewellery', items: ['Shahjahanabad Meenakari Enamelling'] },
      { category: 'Special/Other', items: ['Paper Mache & Parchment Crafts'] }
    ]
  },
  {
    name: 'Jammu & Kashmir',
    slug: 'jammu-kashmir',
    region: 'Union Territory',
    description: 'Crown of India renowned for Pashmina & Kani cashmere shawls, Walnut wood carvings, Paper Mache, and Sozni embroidery.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Pashmina Cashmere Shawls', 'Kani Code-Woven Shawls', 'Kashmir Silk Carpet'] },
      { category: 'Embroidery', items: ['Sozni Needlework', 'Aari Staple Embroidery'] },
      { category: 'Wood', items: ['Srinagar Hand-Carved Walnut Wood Boxes & Furniture'] },
      { category: 'Special/Other', items: ['Kashmiri Naqashi Paper Mache Art'] }
    ]
  },
  {
    name: 'Ladakh',
    slug: 'ladakh',
    region: 'Union Territory',
    description: 'High desert roof of the world famed for Changthangi Pashmina fleece, Thangka scrolls, and metal prayer wheels.',
    crafts: [
      { category: 'Handloom & Textiles', items: ['Changthangi Raw Pashmina Wool', 'Ladakhi Snabu Felt Wool Fabrics'] },
      { category: 'Painting & Folk Art', items: ['Monastic Thangka Scroll Paintings'] },
      { category: 'Metal', items: ['Copper & Silver Repousse Prayer Wheels & Utensils'] }
    ]
  },
  {
    name: 'Lakshadweep',
    slug: 'lakshadweep',
    region: 'Union Territory',
    description: 'Coral coral islands preserving coconut coir matting, seashell craft, and wooden boat carving.',
    crafts: [
      { category: 'Natural Fibre', items: ['Coir Fibre Rope & Floor Coverings'] },
      { category: 'Jewellery', items: ['Seashell Ornaments & Coral Replicas'] },
      { category: 'Wood', items: ['Traditional Miniature Boat Models'] }
    ]
  },
  {
    name: 'Puducherry',
    slug: 'puducherry',
    region: 'Union Territory',
    description: 'Franco-Tamil coastal town celebrated for handmade marbleized paper, terracotta pottery, and organic cotton weaves.',
    crafts: [
      { category: 'Special/Other', items: ['Auroville Handmade Marbleized Paper', 'Incense & Botanical Essential Oils'] },
      { category: 'Pottery/Clay', items: ['Puducherry Studio Glazed Ceramics'] },
      { category: 'Handloom & Textiles', items: ['Organic Handwoven Table Linen'] }
    ]
  }
];

export function getStateBySlug(slug) {
  return STATES_CRAFTS.find(s => s.slug === slug || s.slug.toLowerCase() === slug?.toLowerCase());
}
