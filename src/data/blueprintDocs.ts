import { BlueprintDocItem } from '../types';

export const blueprintCategories = [
  'Constitution & Vision',
  'Artist OS',
  'Keedohub Studio',
  'Creative Engines',
  'Brand & Creator OS',
  'Business OS',
  'System Architecture',
  'Design Tokens & Shell',
  'Product Roadmap & MVP',
  'Architecture Decisions'
];

export const blueprintDocs: BlueprintDocItem[] = [
  {
    id: 'doc-00',
    slug: '00-product-constitution',
    category: 'Constitution & Vision',
    title: '00. Product Constitution',
    content: `# Keedohub Product Constitution

## 1. Absolute Directives
- **Deterministic First**: Programmed domain logic is preferred whenever rules can solve the problem.
- **AI as Subsystem**: AI never defines the product identity; it assists and accelerates verified workflows.
- **Artist & Creator First**: Designed around actual music release schedules, stems, EPKs, and creative assets.
- **Asset Integrity**: Master audio files, high-res artworks, vectors, and split sheets are protected and versioned.
- **Human Studio Layer**: Real creative studio services integrate seamlessly into the user's persistent workspace.

## 2. Core Creative Loop
**Identity → Create → Organize → Produce → Release → Promote → Learn → Next Move**`
  },
  {
    id: 'doc-01',
    slug: '01-vision',
    category: 'Constitution & Vision',
    title: '01. Vision & Identity',
    content: `# Vision: The Creative Operating System

Keedohub replaces fragmented spreadsheets, cloud drives, messy chats, and chaotic release checklists with a unified operating system built for modern independent culture makers.

### The Problem It Solves
Creative people spend 70% of their energy managing logistics, missing file links, uncoordinated marketing, and lost momentum. Keedohub turns chaotic creative projects into automated, structured momentum.`
  },
  {
    id: 'doc-artist-os',
    slug: 'artist-os',
    category: 'Artist OS',
    title: 'Artist OS & Release Pipeline',
    content: `# Artist OS

## Mission
Help independent artists and producer collectives manage the entire creative lifecycle surrounding their music without losing release momentum.

## Release Lifecycle Stages:
1. **Draft**: Conceptualizing, initial demos, track listing.
2. **Preparing**: Mastering audio (24-bit 48kHz), 3000x3000px artwork validation, metadata & ISRC assignment.
3. **Ready**: Distribution package locked, DSP submission prepared.
4. **Scheduled**: Editorial curator pitching (-14d), EPK outreach (-10d), 9:16 Canvas teasers (-7d).
5. **Released**: Launch day drop, streaming link blast, community activation.
6. **Sustaining**: Post-release analytics, sync licensing pitches, merch & live shows.`
  },
  {
    id: 'doc-release-engine',
    slug: 'release-engine',
    category: 'Artist OS',
    title: 'Release Engine & Deterministic Milestones',
    content: `# Release Engine

## Purpose
Convert a musical release record into an automated, time-locked creative preparation workflow.

## Timeline Engine Rules:
- **-30 Days**: 24-bit lossless master audio and 3000x3000px cover art required.
- **-21 Days**: DSP delivery & UPC assignment.
- **-14 Days**: Spotify for Artists pitch deadline.
- **-7 Days**: Short-form vertical teaser campaign & pre-save push.
- **0 Days**: Launch announcement, bio links switch, press distribution.`
  },
  {
    id: 'doc-epk-system',
    slug: 'epk-system',
    category: 'Artist OS',
    title: 'Electronic Press Kit (EPK) System',
    content: `# EPK System

## Capabilities
- Dynamic public press kit page with verified streaming statistics.
- Direct download links for high-res press portraits (print & digital).
- Interactive audio player for highlighted singles and unreleased previews.
- Technical stage rider, input list, and booking/press management routing.`
  },
  {
    id: 'doc-studio',
    slug: 'keedohub-studio',
    category: 'Keedohub Studio',
    title: 'Keedohub Studio Service Model',
    content: `# Keedohub Studio

Keedohub Studio is the human creative production layer built directly into the operating system.

## Creative Services Catalog:
- **Artwork & Packaging**: 3000x3000px DSP single/album covers, Apple Music animated covers, vinyl packaging.
- **3D & Motion Visualizers**: 9:16 vertical canvas loops, 4K YouTube audio visualizers, reactive sound visualizers.
- **Brand Identity Kits**: Typography hierarchy, color token schemes, custom vector logos.
- **Release Toolkits**: Social banners, story countdowns, promotional ad creatives.`
  },
  {
    id: 'doc-momentum-engine',
    slug: 'creative-momentum-engine',
    category: 'Creative Engines',
    title: 'Creative Momentum Engine',
    content: `# Creative Momentum Engine

## Mission
Analyze all workspace signals to surface explainable, high-impact "Next Moves".

## Evaluated Signals:
1. **Upcoming Release Deadlines**: Calculates days until drop and flags missing requirements.
2. **Missing Assets**: Unvalidated artwork dimensions, uncompressed audio stems, missing vertical canvases.
3. **Content Gaps**: Days before release with zero scheduled promotional content.
4. **Studio Deliverable Reviews**: Completed proofs awaiting artist sign-off.`
  },
  {
    id: 'doc-brand-tokens',
    slug: 'brand-tokens',
    category: 'Design Tokens & Shell',
    title: 'Brand Tokens & Visual Identity',
    content: `# Keedohub Brand Tokens

## Color Palette:
- **Primary**: #9B1B1B (Deep Vermillion Red)
- **Primary Dark**: #7A1515
- **Primary Light**: #C0392B
- **Accent**: #F5A623 (Warm Amber Gold)
- **Background**: #0A0A0A (Pure Dark Canvas)
- **Card Surface**: #141414
- **Elevated Surface**: #1C1C1C
- **Subtle Border**: #282828
- **Primary Text**: #F0F0F0
- **Muted Text**: #9A9A9A

## Typography:
- **Display**: Space Grotesk
- **UI & Body**: Plus Jakarta Sans
- **Metadata & Technical**: JetBrains Mono`
  },
  {
    id: 'doc-brand-creator',
    slug: 'brand-creator-os',
    category: 'Brand & Creator OS',
    title: 'Brand OS & Creator OS',
    content: `# Brand OS & Creator OS

## Brand OS
- Multi-channel product launch campaigns.
- Brand asset libraries with strict versioning.
- Collaboration workflows for creative directors and marketing leads.

## Creator OS
- Content pipeline across TikTok, YouTube, Instagram, and X.
- Sponsor deal tracking with deliverables and payment milestones.
- Audience conversion and engagement monitoring.`
  },
  {
    id: 'doc-business-os',
    slug: 'business-os',
    category: 'Business OS',
    title: 'Business OS & Split Sheets',
    content: `# Business OS

## Core Infrastructure
- **Song Split Sheets**: Real-time songwriter, producer, and featured artist share calculation with PRO affiliations (BMI, ASCAP, PRS).
- **Master & Publishing Agreements**: Secure document storage with digital approval state.
- **Catalog Royalty & Revenue Tracking**: Deal summaries and payout schedules.`
  }
];
