export type Creator = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  uniqueId: string | null
  tcmId: string | null
  nickName: string | null
  avatar: string | null
  private: boolean | null
  verified: boolean | null
  visibility: boolean | null
  description: string | null
  email: string | null
  phone: string | null
  instagram: string | null
  country: Country | null
  industries: Industry[] | null
  bioLink: string | null
  followerCount: string | null
  likeCount: string | null
  videoCount: string | null
  viewCount: string | null
  ttSeller: boolean | null
}

export type Country = {
  id: string
  value: string
  label: string
}

export type Industry = {
  id: string
  value: string
  label: string
}

export type FilterData = {
  id: string
  value: string
}

export type CreatorFilter = {
  country: FilterData[]
  industry: FilterData[]
  followersCount: FilterData[]
}
