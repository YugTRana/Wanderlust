const sampleListings = [
  {
    title: "Desert Camp Under the Stars",
    description: "Spend a magical night in a luxury desert camp with camel rides, traditional food, and breathtaking starry skies.",
    image: {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 1800,
    location: "Jaisalmer",
    country: "India",
    category: "trending",
    geometry: {
      type: "Point",
      coordinates: [70.9083, 26.9157],
    }
  },

  {
    title: "Houseboat on Backwaters",
    description: "Relax on a traditional houseboat while cruising through Kerala's peaceful backwaters.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 2200,
    location: "Alleppey",
    country: "India",
    category: "rooms",
    geometry: {
      type: "Point",
      coordinates: [76.3388, 9.4981],
    }
  },

  {
    title: "Luxury Beach Resort",
    description: "Enjoy crystal-clear waters, private beaches, and world-class hospitality in this tropical paradise.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 4500,
    location: "Maldives",
    country: "Maldives",
    category: "swimmingpool",
    geometry: {
      type: "Point",
      coordinates: [73.5093, 4.1755],
    }
  },

  {
    title: "Snow Cabin Escape",
    description: "Cozy wooden cabin surrounded by snowy mountains with a fireplace and stunning winter scenery.",
    image: {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 2800,
    location: "Manali",
    country: "India",
    category: "mountaines",
    geometry: {
      type: "Point",
      coordinates: [77.1892, 32.2396],
    }
  },

  {
    title: "Traditional Japanese Ryokan",
    description: "Experience authentic Japanese hospitality with tatami rooms and natural hot springs.",
    image: {
      url: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 3200,
    location: "Kyoto",
    country: "Japan",
    category: "rooms",
    geometry: {
      type: "Point",
      coordinates: [135.7681, 35.0116],
    }
  },

  {
    title: "Lake View Cottage",
    description: "Wake up to beautiful lake views and enjoy peaceful evenings by the fireplace.",
    image: {
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 1700,
    location: "Nainital",
    country: "India",
    category: "trending",
    geometry: {
      type: "Point",
      coordinates: [79.4636, 29.3919],
    }
  },

  {
    title: "Countryside Farm Stay",
    description: "Experience rural life with fresh organic food, farm activities, and scenic landscapes.",
    image: {
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 1400,
    location: "Punjab",
    country: "India",
    category: "rooms",
    geometry: {
      type: "Point",
      coordinates: [76.7794, 30.7333],
    }
  },

  {
    title: "Cliffside Ocean Villa",
    description: "Luxury villa perched on dramatic cliffs with an infinity pool overlooking the ocean.",
    image: {
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 5200,
    location: "Bali",
    country: "Indonesia",
    category: "swimmingpool",
    geometry: {
      type: "Point",
      coordinates: [115.2167, -8.65],
    }
  },

  {
    title: "Paris City Apartment",
    description: "Modern apartment just minutes from famous landmarks, cafes, and shopping streets.",
    image: {
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 2700,
    location: "Paris",
    country: "France",
    category: "rooms",
    geometry: {
      type: "Point",
      coordinates: [2.3522, 48.8566],
    }
  },

  {
    title: "Rainforest Eco Lodge",
    description: "Immerse yourself in lush rainforest surroundings with eco-friendly accommodations.",
    image: {
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 2600,
    location: "Amazon",
    country: "Brazil",
    category: "trending",
    geometry: {
      type: "Point",
      coordinates: [-60.0217, -3.119],
    }
  },

  {
    title: "Royal Palace Stay",
    description: "Live like royalty in a converted palace featuring luxurious rooms and heritage architecture.",
    image: {
      url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 6000,
    location: "Udaipur",
    country: "India",
    category: "trending",
    geometry: {
      type: "Point",
      coordinates: [73.7125, 24.5854],
    }
  },

  {
    title: "Himalayan Camping Experience",
    description: "Adventure-filled camping trip with breathtaking Himalayan views and guided trekking.",
    image: {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 1300,
    location: "Leh",
    country: "India",
    category: "mountaines",
    geometry: {
      type: "Point",
      coordinates: [77.577, 34.1526],
    }
  },

  {
    title: "Dubai Marina Apartment",
    description: "Stylish apartment offering skyline views, luxury shopping, and vibrant nightlife.",
    image: {
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 3800,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "rooms",
    geometry: {
      type: "Point",
      coordinates: [55.2708, 25.2048],
    }
  },

  {
    title: "Greek Island Villa",
    description: "Whitewashed villa with spectacular sea views and unforgettable sunsets.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 4900,
    location: "Santorini",
    country: "Greece",
    category: "swimmingpool",
    geometry: {
      type: "Point",
      coordinates: [25.7294, 66.5039],
    }
  },

  {
    title: "Forest Glass Cabin",
    description: "Sleep beneath the stars in a cozy glass cabin surrounded by peaceful forests.",
    image: {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60",
      filename: "listingPhoto",
    },
    price: 3100,
    location: "Lapland",
    country: "Finland",
    category: "mountaines",
    geometry: {
      type: "Point",
      coordinates: [25.7482, 61.9241]
    }
  },
];

module.exports = { data: sampleListings };