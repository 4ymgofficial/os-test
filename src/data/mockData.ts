import { 
  Workspace, 
  Release, 
  Asset, 
  ContentItem, 
  StudioRequest, 
  MomentumSignal, 
  EPKProfile,
  BrandCampaign,
  CreatorDeal,
  SplitSheet 
} from '../types';

export const initialWorkspaces: Workspace[] = [
  {
    id: 'ws-artist',
    name: 'Kayo Velo',
    slug: 'kayo-velo',
    role: 'artist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    handle: '@kayovelo',
    genreOrNiche: 'Alternative Hip-Hop / Electronic',
    memberCount: 3
  },
  {
    id: 'ws-brand',
    name: 'Aura Soundwear',
    slug: 'aura-soundwear',
    role: 'brand',
    avatar: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80',
    handle: '@aurasound',
    genreOrNiche: 'Audio Tech & Streetwear',
    memberCount: 8
  },
  {
    id: 'ws-creator',
    name: 'Velo Studios Media',
    slug: 'velo-creator',
    role: 'creator',
    avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80',
    handle: '@velostudios',
    genreOrNiche: 'Music Production & Tech Review',
    memberCount: 2
  },
  {
    id: 'ws-business',
    name: 'Velour Records & Mgmt',
    slug: 'velour-records',
    role: 'business',
    avatar: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=150&auto=format&fit=crop&q=80',
    handle: '@velourrecords',
    genreOrNiche: 'Independent Record Label & Publishing',
    memberCount: 12
  }
];

export const initialReleases: Release[] = [
  {
    id: 'rel-1',
    title: 'MIDNIGHT CYBER',
    type: 'Single',
    artist: 'Kayo Velo feat. Nyx',
    genre: 'Electronic / Synthwave',
    releaseDate: '2026-09-12',
    status: 'preparing',
    upc: '793573194021',
    coverArtUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    preSaveUrl: 'https://ffm.to/midnight-cyber',
    spotifyUrl: 'https://open.spotify.com/album/example1',
    budget: 3500,
    distributor: 'DistroKid / Keedohub Direct',
    notes: 'Lead single for upcoming album. Focus on editorial synth playlists and TikTok visual teasers.',
    tracks: [
      {
        id: 'trk-1',
        title: 'Midnight Cyber (Main Version)',
        trackNumber: 1,
        duration: '3:24',
        isrc: 'US-KAY-26-00101',
        audioState: 'mastered',
        bpm: 128,
        key: 'F# Minor',
        explicit: false,
        producers: ['Kayo Velo', 'Alex Vance'],
        collaborators: ['Nyx (Vocals)'],
        lyrics: `[Verse 1]\nNeon reflections on rain-slicked asphalt\nRunning the wire till the servers crash out\nGot my memory banked in a sub-bass vault\nNever looking back when the alarms ring out\n\n[Chorus]\nMidnight Cyber, sparks in the rain\nRewriting frequencies inside the brain\nMidnight Cyber, out of the grid\nDoing what they said nobody ever did\n\n[Drop]\n(Heavy synth arpeggios)`
      }
    ],
    milestones: [
      {
        id: 'm-1',
        title: 'Final Master Audio (24-bit 48kHz WAV)',
        daysBefore: -30,
        completed: true,
        category: 'audio',
        description: 'Uploaded high resolution 24-bit stereo master and instrumental track.'
      },
      {
        id: 'm-2',
        title: '3000x3000px Cover Artwork Validation',
        daysBefore: -28,
        completed: true,
        category: 'visual',
        description: 'RGB Color profile verified, no barcodes, text conforms to DSP standards.'
      },
      {
        id: 'm-3',
        title: 'DSP Distribution Submission & UPC Locking',
        daysBefore: -21,
        completed: true,
        category: 'distribution',
        description: 'Submitted to Spotify, Apple Music, Tidal, Amazon Music, TikTok Library.'
      },
      {
        id: 'm-4',
        title: 'Spotify for Artists Editorial Pitch',
        daysBefore: -14,
        completed: false,
        category: 'marketing',
        description: 'Submit curator pitch with mood tags, instruments, and campaign story.'
      },
      {
        id: 'm-5',
        title: 'EPK & Press Outreach Dispatch',
        daysBefore: -10,
        completed: false,
        category: 'epk',
        description: 'Send electronic press kit to targeted electronic blog curators and radios.'
      },
      {
        id: 'm-6',
        title: '9:16 Canvas & Short-form Teaser Batch',
        daysBefore: -7,
        completed: false,
        category: 'visual',
        description: 'Render Spotify Canvas 8-second seamless loop and 5 TikTok teaser hooks.'
      },
      {
        id: 'm-7',
        title: 'Launch Day Drop & Streaming Blast',
        daysBefore: 0,
        completed: false,
        category: 'marketing',
        description: 'Live broadcast, newsletter dispatch, bio link switch, and social announcement.'
      }
    ]
  },
  {
    id: 'rel-2',
    title: 'CHROMA SUITE',
    type: 'EP',
    artist: 'Kayo Velo',
    genre: 'Future Beats / Alternative R&B',
    releaseDate: '2026-10-24',
    status: 'draft',
    upc: '793573194098',
    coverArtUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80',
    preSaveUrl: '',
    budget: 6000,
    distributor: 'Velour Records',
    notes: '4-track concept EP exploring visual color-to-sound synesthesia.',
    tracks: [
      {
        id: 'trk-201',
        title: 'Infrared Pulse',
        trackNumber: 1,
        duration: '2:45',
        isrc: 'US-KAY-26-00201',
        audioState: 'mastered',
        bpm: 110,
        key: 'A Minor',
        explicit: false
      },
      {
        id: 'trk-202',
        title: 'Cobalt Horizon',
        trackNumber: 2,
        duration: '3:18',
        isrc: 'US-KAY-26-00202',
        audioState: 'final_mix',
        bpm: 120,
        key: 'D Major',
        explicit: false
      },
      {
        id: 'trk-203',
        title: 'Amber Glow',
        trackNumber: 3,
        duration: '3:50',
        isrc: 'US-KAY-26-00203',
        audioState: 'rough_mix',
        bpm: 95,
        key: 'G Minor',
        explicit: true
      },
      {
        id: 'trk-204',
        title: 'Violet Echoes',
        trackNumber: 4,
        duration: '4:12',
        isrc: 'US-KAY-26-00204',
        audioState: 'demo',
        bpm: 130,
        key: 'E Minor',
        explicit: false
      }
    ],
    milestones: [
      {
        id: 'cm-1',
        title: 'Complete 4-Track Mix & Master',
        daysBefore: -45,
        completed: false,
        category: 'audio',
        description: 'Deliver finalized 4-track stem package to mastering engineer.'
      },
      {
        id: 'cm-2',
        title: 'Deluxe EP Packaging & Artwork',
        daysBefore: -35,
        completed: false,
        category: 'visual',
        description: 'Complete cover art, back cover, booklet, and animated artwork.'
      },
      {
        id: 'cm-3',
        title: 'Distribution Delivery',
        daysBefore: -28,
        completed: false,
        category: 'distribution',
        description: 'Deliver to DSPs with minimum 4-week lead time for playlist placement.'
      }
    ]
  },
  {
    id: 'rel-3',
    title: 'NEO GENESIS',
    type: 'Album',
    artist: 'Kayo Velo',
    genre: 'Alternative Hip-Hop',
    releaseDate: '2025-11-18',
    status: 'sustaining',
    upc: '793573190014',
    coverArtUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    spotifyUrl: 'https://open.spotify.com/album/neogenesis',
    appleMusicUrl: 'https://music.apple.com/album/neogenesis',
    budget: 12000,
    distributor: 'Velour Records',
    notes: 'Debut studio album with over 2.4M global catalog streams. Continuing sync licensing outreach.',
    tracks: [
      { id: 't301', title: 'Solar Flare', trackNumber: 1, duration: '2:15', isrc: 'US-KAY-25-00101', audioState: 'mastered', explicit: false },
      { id: 't302', title: 'Silicon Valley Blues', trackNumber: 2, duration: '3:40', isrc: 'US-KAY-25-00102', audioState: 'mastered', explicit: true },
      { id: 't303', title: 'Satellite Dreams', trackNumber: 3, duration: '3:10', isrc: 'US-KAY-25-00103', audioState: 'mastered', explicit: false },
      { id: 't304', title: 'Gravity Well', trackNumber: 4, duration: '4:02', isrc: 'US-KAY-25-00104', audioState: 'mastered', explicit: false }
    ],
    milestones: [
      { id: 'ng-1', title: 'Global Album Drop', daysBefore: 0, completed: true, category: 'marketing', description: 'Album published across 40+ DSPs.' },
      { id: 'ng-2', title: 'Sync Licensing Pitch to Netflix & HBO', daysBefore: 30, completed: true, category: 'marketing', description: 'Placed track 2 on indie gaming soundtrack.' }
    ]
  }
];

export const initialAssets: Asset[] = [
  {
    id: 'ast-1',
    title: 'Midnight Cyber - 24bit Master WAV',
    category: 'audio',
    fileType: 'WAV (48kHz/24bit)',
    fileSize: '42.8 MB',
    url: '#',
    tags: ['Master', '24-bit', 'Single', 'Lossless'],
    releaseId: 'rel-1',
    createdAt: '2026-08-15',
    dimensionsOrDuration: '3:24',
    version: 3
  },
  {
    id: 'ast-2',
    title: 'Midnight Cyber - Hi-Res Cover Art (3000x3000)',
    category: 'artwork',
    fileType: 'PNG (RGB)',
    fileSize: '18.4 MB',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
    tags: ['Cover Art', '3000x3000', 'DSP Ready', 'Artwork'],
    releaseId: 'rel-1',
    createdAt: '2026-08-18',
    dimensionsOrDuration: '3000 x 3000 px',
    version: 2
  },
  {
    id: 'ast-3',
    title: 'Kayo Velo - Studio Press Portrait 2026',
    category: 'press_photo',
    fileType: 'JPEG (High-Res)',
    fileSize: '12.1 MB',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    tags: ['Press Photo', 'EPK', 'Editorial', 'Kayo Velo'],
    createdAt: '2026-08-01',
    dimensionsOrDuration: '4000 x 6000 px',
    version: 1
  },
  {
    id: 'ast-4',
    title: 'Midnight Cyber 3D Motion Teaser Loop',
    category: 'video',
    fileType: 'MP4 (ProRes 422)',
    fileSize: '124.5 MB',
    url: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&auto=format&fit=crop&q=80',
    tags: ['Motion', '9:16', 'Visualizer', 'TikTok Loop'],
    releaseId: 'rel-1',
    createdAt: '2026-08-20',
    dimensionsOrDuration: '0:15 (1080x1920)',
    version: 1
  },
  {
    id: 'ast-5',
    title: 'Keedohub Brand Identity Tokens & Typography Pack',
    category: 'brand_kit',
    fileType: 'ZIP / SVG / PDF',
    fileSize: '8.7 MB',
    url: '#',
    tags: ['Brand Kit', 'Logos', 'Vectors', 'Typography'],
    createdAt: '2026-07-20',
    version: 1
  },
  {
    id: 'ast-6',
    title: 'Midnight Cyber Official Split Sheet Agreement',
    category: 'legal_doc',
    fileType: 'PDF (Executed)',
    fileSize: '1.2 MB',
    url: '#',
    tags: ['Split Sheet', 'Publishing', 'PRO', 'Legal'],
    releaseId: 'rel-1',
    createdAt: '2026-08-14',
    version: 1
  }
];

export const initialContentItems: ContentItem[] = [
  {
    id: 'cnt-1',
    title: 'Midnight Cyber Synth Breakdown Hook',
    platform: 'tiktok',
    format: 'Short Video',
    status: 'ready',
    scheduledDate: '2026-09-02',
    releaseId: 'rel-1',
    copy: 'Made this synth lead using analog oscillators in 15 mins. Dropping Sept 12 ⚡️ pre-save in bio',
    hook: 'How I made the dirtiest synth lead of 2026 with $0 plugins',
    tags: ['#producer', '#electronicmusic', '#synthesizer', '#newmusic'],
    mediaPreview: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
    metrics: { views: 0, likes: 0, shares: 0 }
  },
  {
    id: 'cnt-2',
    title: 'Full Studio Session Behind The Scenes',
    platform: 'youtube',
    format: 'Behind The Scenes',
    status: 'editing',
    scheduledDate: '2026-09-05',
    releaseId: 'rel-1',
    copy: 'Come inside the midnight studio session where we tracked the vocals for MIDNIGHT CYBER feat Nyx.',
    hook: 'Building a track at 3 AM with zero sleep',
    tags: ['StudioVlog', 'MusicProduction', 'AbletonLive'],
    mediaPreview: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cnt-3',
    title: 'Cover Art & Cyberpunk Aesthetic Carousel',
    platform: 'instagram',
    format: 'Carousel',
    status: 'scheduled',
    scheduledDate: '2026-09-08',
    releaseId: 'rel-1',
    copy: 'MIDNIGHT CYBER // SEPT 12. Slide 1 to 5 for the creative evolution and moodboard.',
    tags: ['#graphicdesign', '#albumart', '#cyberpunk', '#3dart'],
    mediaPreview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cnt-4',
    title: 'Official Release Drop Tweet & Audio Snippet',
    platform: 'x',
    format: 'Text Post',
    status: 'idea',
    scheduledDate: '2026-09-12',
    releaseId: 'rel-1',
    copy: 'MIDNIGHT CYBER IS OUT EVERYWHERE NOW. Stream it loud. Link in bio 🚀',
    tags: ['#newmusic', '#streamnow', '#midnightcyber']
  }
];

export const initialStudioRequests: StudioRequest[] = [
  {
    id: 'std-1',
    serviceType: '3D & Motion Visualizer',
    tier: 'Pro',
    status: 'in_production',
    title: 'Midnight Cyber 3D Holographic Visualizer Loop',
    brief: 'Create a dark cyberpunk neon aesthetic looping visualizer with responsive frequency pulse for Spotify Canvas & YouTube visualizer.',
    references: ['Blade Runner 2049 UI', 'Akira wireframe grid', 'Keedohub brand red/gold colors'],
    deadline: '2026-09-04',
    price: 450,
    revisionsUsed: 1,
    revisionsAllowed: 3,
    deliverables: [
      {
        id: 'deliv-1',
        title: 'Rough Animation Proof V1 (1080x1920 MP4)',
        url: '#',
        fileType: 'MP4',
        date: '2026-08-22'
      }
    ],
    comments: [
      {
        id: 'c-1',
        author: 'Keedohub Studio Lead',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        isStudioTeam: true,
        text: 'V1 render uploaded! Please check the neon glow timing with your audio drop at 0:45.',
        timestamp: '2 days ago'
      },
      {
        id: 'c-2',
        author: 'Kayo Velo',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        isStudioTeam: false,
        text: 'The particle effects look incredible. Could we intensify the deep red hue during the chorus swell?',
        timestamp: 'Yesterday'
      }
    ],
    createdAt: '2026-08-16',
    releaseId: 'rel-1'
  },
  {
    id: 'std-2',
    serviceType: 'Artwork & Packaging',
    tier: 'Signature',
    status: 'completed',
    title: 'Midnight Cyber Single Artwork & Packaging Suite',
    brief: 'Primary 3000x3000px single cover, animated square cover for Apple Music, and digital booklet typography.',
    references: ['Minimalist brutalist typography', 'Red and gold chromatic aberration'],
    deadline: '2026-08-18',
    price: 350,
    revisionsUsed: 2,
    revisionsAllowed: 3,
    deliverables: [
      {
        id: 'deliv-2',
        title: 'Master Art Package (3000x3000px PSD + PNG)',
        url: '#',
        fileType: 'ZIP',
        date: '2026-08-18'
      }
    ],
    comments: [
      {
        id: 'c-3',
        author: 'Keedohub Studio Art Director',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
        isStudioTeam: true,
        text: 'Final assets approved and transferred directly to your workspace Asset Library.',
        timestamp: '6 days ago'
      }
    ],
    createdAt: '2026-08-10',
    releaseId: 'rel-1'
  }
];

export const initialMomentumSignals: MomentumSignal[] = [
  {
    id: 'sig-1',
    type: 'milestone_due',
    title: 'Pitch "MIDNIGHT CYBER" to Spotify for Artists',
    description: 'Release is 19 days away. Editorial curators recommend pitching 14+ days before Friday drops to guarantee algorithmic release radar indexing.',
    priority: 'urgent',
    actionLabel: 'Open Release Workspace',
    targetView: 'releases',
    targetId: 'rel-1'
  },
  {
    id: 'sig-2',
    type: 'missing_asset',
    title: 'Missing Vertical 9:16 Canvas for DSPs',
    description: 'DSPs show tracks with looping canvases have 145% higher track share rates. Review pending Studio render.',
    priority: 'high',
    actionLabel: 'Review Studio Render',
    targetView: 'studio',
    targetId: 'std-1'
  },
  {
    id: 'sig-3',
    type: 'content_gap',
    title: 'No Content Scheduled for Launch Week',
    description: 'You have only 2 posts planned for launch week. Schedule 3 more short-form hooks to build release momentum.',
    priority: 'medium',
    actionLabel: 'Plan Launch Content',
    targetView: 'content'
  }
];

export const initialEPKProfile: EPKProfile = [
  {
    artistName: 'Kayo Velo',
    stageName: 'Kayo Velo',
    tagline: 'Futuristic alternative electronic & hip-hop pioneer from Berlin / LA.',
    bio: 'Kayo Velo is a genre-fluid producer and vocalist blending gritty cyberpunk soundscapes with hypnotic hip-hop rhythms and soulful vocal textures. With over 3.2 million streams across DSPs and sync placements on acclaimed independent series, Velo represents the new wave of self-sufficient sonic architects.',
    genre: 'Electronic / Alternative Hip-Hop / Synthwave',
    location: 'Los Angeles / Berlin',
    monthlyListeners: 142850,
    socials: {
      spotify: 'https://open.spotify.com/artist/example',
      appleMusic: 'https://music.apple.com/artist/example',
      instagram: 'https://instagram.com/kayovelo',
      tiktok: 'https://tiktok.com/@kayovelo',
      youtube: 'https://youtube.com/@kayovelo',
      x: 'https://x.com/kayovelo'
    },
    pressQuotes: [
      {
        quote: 'Kayo Velo crafts the kind of subterranean electronic beats that feel both ancient and pulled from 2088.',
        publication: 'Electronic Sound Magazine',
        date: 'June 2025'
      },
      {
        quote: 'An astonishing debut that cements Velo as one of the most visionary independent producers of his class.',
        publication: 'Complex Future Sounds',
        date: 'November 2025'
      }
    ],
    highlightReleases: ['rel-1', 'rel-3'],
    pressPhotos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80'
    ],
    riderTechInfo: 'Live Setup: 2x Stereo XLR Master Out, 1x Vocal Shure SM7B into onboard TC-Helicon FX, 1x MIDI Controller (Ableton Push 3). Power: 220V/110V 4x outlets on stage.',
    bookingContact: {
      name: 'Elena Rostova',
      email: 'booking@velourrecords.com',
      phone: '+1 (323) 890-4412'
    },
    pressContact: {
      name: 'Marcus Chen',
      email: 'press@velourrecords.com'
    }
  }
][0];

export const initialSplitSheets: SplitSheet[] = [
  {
    id: 'split-1',
    songTitle: 'Midnight Cyber',
    isrc: 'US-KAY-26-00101',
    status: 'signed',
    createdDate: '2026-08-14',
    contributors: [
      {
        id: 'c-1',
        name: 'Kayo Velo (Composer / Producer)',
        role: 'Producer & Vocalist',
        sharePercent: 60,
        masterShare: 60,
        publishingShare: 60,
        pro: 'BMI (IPI: 84930219)',
        proAffiliation: 'BMI (IPI: 84930219)',
        email: 'kayo@velourrecords.com',
        signed: true
      },
      {
        id: 'c-2',
        name: 'Nyx (Featured Vocalist)',
        role: 'Songwriter & Performer',
        sharePercent: 25,
        masterShare: 25,
        publishingShare: 25,
        pro: 'ASCAP (IPI: 40928172)',
        proAffiliation: 'ASCAP (IPI: 40928172)',
        email: 'nyx@nyxmusic.com',
        signed: true
      },
      {
        id: 'c-3',
        name: 'Alex Vance (Co-Producer)',
        role: 'Mix Engineer & Synth Programming',
        sharePercent: 15,
        masterShare: 15,
        publishingShare: 15,
        pro: 'PRS (IPI: 10928374)',
        proAffiliation: 'PRS (IPI: 10928374)',
        email: 'alex@vancestudio.com',
        signed: true
      }
    ]
  }
];

export const initialBrandCampaigns: BrandCampaign[] = [
  {
    id: 'cmp-1',
    title: 'Aura Soundwear Fall 2026 Launch',
    brandName: 'Aura Soundwear',
    status: 'active',
    budget: 15000,
    deliverables: ['3x Hero 3D Video Renders', 'Interactive Lookbook', 'Product Drop Campaign'],
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    kpis: '25,000 waitlist signups, 1.2M video views'
  }
];

export const initialCreatorDeals: CreatorDeal[] = [
  {
    id: 'cdeal-1',
    brand: 'Novation Audio',
    platform: 'youtube',
    payout: 2200,
    status: 'in_production',
    deliverable: '1x Integrated 90-sec sponsorship in "Building a Track from Scratch" video',
    deadline: '2026-09-08'
  }
];

export const mockWorkspaces = initialWorkspaces;
export const mockReleases = initialReleases;
export const mockAssets = initialAssets;
export const mockContentItems = initialContentItems;
export const mockStudioRequests = initialStudioRequests;
export const mockMomentumSignals = initialMomentumSignals;
export const mockEPKProfile = initialEPKProfile;
export const mockSplitSheets = initialSplitSheets;
export const mockBrandCampaigns = initialBrandCampaigns;
export const mockCreatorDeals = initialCreatorDeals;

