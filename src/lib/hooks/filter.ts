import { useCallback, useState } from 'react';
import { FilterParams } from '../models';

export function useFilterCreator() {
  const [filter, setFilter] = useState<FilterParams>({ pagination: { page: 1, perPage: 10 } })

  const onFilterAddress = useCallback(
    (address: string | undefined) => setFilter(prev => {
      if (!address) {
        delete prev.address
        return { ...prev }
      }
      return { ...prev, address }
    }),
    []
  )

  const onFilterCategory = useCallback(
    (category: string | undefined) => setFilter(prev => {
      if (!category) {
        delete prev.category
        return { ...prev }
      }
      return { ...prev, category }
    }),
    []
  )

  const onFilterLanguage = useCallback(
    (language: string | undefined) => setFilter(prev => {
      if (!language) {
        delete prev.language
        return { ...prev }
      }
      return { ...prev, language }
    }),
    []
  )

  const onFilterEngagement = useCallback(
    (engagementRate: string | undefined) => setFilter(prev => {
      if (!engagementRate) {
        delete prev.engagementRate
        return { ...prev }
      }
      return { ...prev, engagementRate }
    }),
    []
  )

  const onFilterIndustry = useCallback(
    (industry: string | undefined) => setFilter(prev => {
      if (!industry) {
        delete prev.industry
        return { ...prev }
      }
      return { ...prev, industry }
    }),
    []
  )

  const onFilterCountry = useCallback(
    (country: string | undefined) => setFilter(prev => {
      if (!country) {
        delete prev.country
        return { ...prev }
      }
      return { ...prev, country }
    }),
    []
  )

  const onFilterContact = useCallback(
    (contactBy: string | undefined) => setFilter(prev => {
      if (!contactBy) {
        delete prev.contactBy
        return { ...prev }
      }
      return { ...prev, contactBy }
    }),
    []
  )

  const onFilterPageRows = useCallback(
    (perPage: number) => setFilter(prev => ({
      ...prev,
      pagination: {
        page: prev.pagination?.page || 1,
        perPage
      }
    })),
    []
  )

  const paginatePage = useCallback(
    (action: 'next' | 'prev') => setFilter(prev => ({
      ...prev,
      pagination: {
        page: Number(prev.pagination?.page) + (action === 'next' ? 1 : -1),
        perPage: prev.pagination?.perPage || 10
      }
    })),
    []
  )

  const onFilterFollowers = useCallback(
    (data: { from?: number, to?: number }) => setFilter(prev => ({
      ...prev,
      followers: {
        from: data.from || 100,
        to: data.to || 1000000000
      }
    })),
    []
  )

  return {
    filter,
    onFilterAddress,
    onFilterCategory,
    onFilterEngagement,
    onFilterLanguage,
    onFilterCountry,
    onFilterIndustry,
    onFilterContact,
    onFilterPageRows,
    onFilterFollowers,
    paginatePage
  }
}
