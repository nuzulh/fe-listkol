export type Analysis = {
  likeCount: number
  commentCount: number
  shareCount: number
  viewCount: number
  collectCount: number
  createdAt: Date
}

export type AnalysisResult = Analysis & {
  id: string
  videoUrl: string
  oldData: Analysis[]
  updatedAt: Date
}
