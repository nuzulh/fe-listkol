export type OldAnalysis = {
  likeCount: number
  commentCount: number
  shareCount: number
  viewCount: number
  collectCount: number
  engagementRate: number
  createdAt: Date
}

export type Analysis = Omit<OldAnalysis, 'createdAt'> & {
  creatorName: string
  cost: number
  oldData: OldAnalysis[]
}

export type AnalysisResult = {
  id: string
  campaignName: string
  createdAt: string
  updatedAt: string
  details: Analysis[]
}
