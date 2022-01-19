import bcrypt from 'bcryptjs'
const data = {
  users: [
    {
      name: 'Clark',
      email: 'clark@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Bruce',
      email: 'bruce@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Gucci Marmont Bag',
      category: 'Bag',
      image:
        'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1638986583/Fashion/gucblac_cb8pxt.webp',
      imageA:
        'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1638986583/Fashion/gucblac_cb8pxt.webp',
      imageB:
        'https://res.cloudinary.com/ceenobi/image/upload/v1639042219/Fashion/443497_DTDIT_5729_005_100_0000_Light-GG-Marmont-matelass-shoulder-bag_z7pzn7.webp',
      price: 500,
      rating: 4.5,
      brand: 'GUCCI',
      numReview: 10,
      countInStock: 20,
      description:
        'The small GG Marmont chain shoulder bag has a softly structured shape and an oversized flap closure with Double G hardware. The sliding chain strap can be worn multiple ways, changing between a shoulder and a top handle bag. Made in matelassé chevron leather with a heart on the back.',
      slug: 'gucci-ariabag',
      title: 'GG Marmont matelassé shoulder bag',
      isFeatured: true,
    },
    {
      name: 'GG Tote Bag',
      category: 'Bag',
      image:
        'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1638978465/Fashion/gucci_2_qyqoxj.webp',
      imageA:
        'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1639124386/Fashion/q674148_92THG_8563_001_088_0000_Light-Medium-tote-with-Interlocking-G_u74tia.webp',
      imageB:
        'https://res.cloudinary.com/ceenobi/image/upload/v1639124385/Fashion/q74148_UQHHG_8678_005_100_0000_Light-Medium-tote-with-geometric-print_vtsu2h.webp',
      price: 500,
      rating: 4.3,
      brand: 'GUCCI',
      numReview: 5,
      countInStock: 20,
      description:
        'This item features bright and colorful geometric motifs that recall the uniforms worn by horse riding jockeys. The collection is inspired by the Parade Ring, or paddock, where horses walk around as a warm-up before the race and to help racegoers pick a winner. Here the print appears on this medium tote.',
      slug: 'gucci-supremebag',
      title: 'Medium tote with geometric print',
      isFeatured: true,
    },
    {
      name: 'GG Supreme canvas',
      category: 'Shoes',
      image:
        'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1638978465/Fashion/sneakers_gucci_hs2czg.webp',
      imageA:
        'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1638978465/Fashion/sneakers_gucci_hs2czg.webp',
      imageB:
        'https://res.cloudinary.com/ceenobi/image/upload/v1639125913/Fashion/a681066_ULZ10_9795_006_100_0000_Light-Mens-The-Hacker-Project-Triple-S-sneaker_l0jo0p.webp',

      price: 150,
      brand: 'GUCCI',
      rating: 4.5,
      numReview: 10,
      countInStock: 20,
      description:
        'Exploring ideas of authenticity and appropriation within the fashion industry, Gucci Aria unveils The Hacker Project. In his latest collection, Alessandro Michele—in expressions of homage—infuses iconic Balenciaga silhouettes with Gucci codes in unique creations. The Triple S sneaker is presented in the signature GG Supreme canvas with allover Balenciaga print.',
      slug: 'gucci-canvas',
      title: "Men's The Hacker Project Triple S sneaker",
    },
    {
      name: 'Grip watch, 35mm',
      category: 'Watch',
      image:
        'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1638978465/Fashion/men_watch_sre6yz.webp',
      imageA:
        'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1638978465/Fashion/men_watch_sre6yz.webp',
      imageB:
        'https://res.cloudinary.com/ceenobi/image/upload/v1639128154/Fashion/w673123_ICUA0_9812_001_100_0000_Light-GUCCI-25H-watch-38mm_zjexb8.webp',
      price: 1000,
      rating: 4.7,
      brand: 'PATEK',
      numReview: 10,
      countInStock: 20,
      description:
        "The PATEK 25H's streamlined silhouette was inspired by the sleek forms of contemporary architecture. The watch is presented with a gold-plated multi-layer case with a five-link steel bracelet. The name, GUCCI 25H, is attributed to a particularly symbolic talisman for Creative Director Alessandro Michele.",
      slug: 'grip-watch',
      title: 'Gold-plated multi-layer case',
    },
    {
      name: 'Stealth 25H watch, 38mm',
      category: 'Watch',
      image:
        'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1638978465/Fashion/men_watch2_z9iybs.webp',
      imageA:
        'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1638978465/Fashion/men_watch2_z9iybs.webp',
      imageB:
        'https://res.cloudinary.com/ceenobi/image/upload/v1639128547/Fashion/P584275_I18V0_8508_008_100_0000_Light-Grip-watch-35mm_qlmyfz.webp',
      price: 900,
      brand: 'PATEK',
      rating: 4.5,
      numReview: 10,
      countInStock: 20,
      description:
        "A clean, streamlined design that fits snugly around the wrist, the Grip watch takes its inspiration from the world of skateboarding, its name recalling the way the rider’s sneakers stick to the grip tape on a skateboard. The stainless steel face has three windows to display the hour, minute and date, completed with an alligator strap. Designed with a special mechanism that allows the strap to be removed, this watch's strap is interchangeable and can be replaced with coordinating 35mm Grip straps.",
      slug: 'stealth-watch',
      title: 'Multi-layer case with a five-link steel bracelet',
    },
    {
      name: 'knit cardigan',
      category: 'Clothing',
      image:
        'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1638978466/Fashion/mens_cardigan_nxojpv.webp',
      imageA:
        'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1638978466/Fashion/mens_cardigan_nxojpv.webp',
      imageB:
        'https://res.cloudinary.com/ceenobi/image/upload/v1639128905/Fashion/c673487_XKB2N_8011_002_100_0000_Light-Cable-knit-cardigan-with-Web_f9sgfc.jpg',
      price: 100,
      rating: 3,
      brand: 'ROCA',
      numReview: 10,
      countInStock: 20,
      description:
        'A cable knit cardigan featuring green and red Web detail along the bottom and woven leather buttons. The preppy influence, a style that can be traced back to the Ivy League schools in the Northeast United States, continues to characterize the Gucci narrative. In the latest collections, the concept transcends the original lifestyle and is now identified by House codes and androgynous silhouettes. ',
      slug: 'knit-cardigan',
      title: 'Cable knot cardigan that warms nicely',
    },
  ],
}
export default data
