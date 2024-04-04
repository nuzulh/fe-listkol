export enum Objective {
  SALES = "Sales",
  ENGAGEMENT = "Engagement",
  AWARENESS = "Awareness",
  DOWNLOADER = "Downloader",
}

export enum Timeline {
  ONE_WEEK = "1 Week",
  TWO_WEEKS = "2 Weeks",
  THREE_WEEKS = "3 Weeks",
  FOUR_WEEKS = "4 Weeks",
}

export type CampaignBody = {
  country?: string
  category?: string
  industry?: string
  objective?: Objective
  product?: string
  targetAudience?: string
  timeline?: Timeline
  influencerCount?: number
}

export type Campaign = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  id: string
  industry: string | null
  category: string
  country: string
  objective: string
  product: string
  targetAudience: string
  timeline: string
  result: string
}
