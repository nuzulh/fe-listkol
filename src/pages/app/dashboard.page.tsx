import { CreatorFilter } from '@/components/filters/creator-filter'
import { PageRowFilter } from '@/components/filters/page-rows'
import { Spinner } from '@/components/loading'
import { columns } from '@/components/tables/creator/columns'
import { DataTable } from '@/components/tables/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FilterParams } from '@/lib/models'
import { getCreatorsKeys, useGetCreatorFilter, useGetCreators } from '@/services/creator/get-creator.service'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'

export default function DashboardPage() {
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState<FilterParams>({ pagination: { page: 1, perPage: 10 } })
  const { data: creatorsResponse, isLoading: creatorsLoading, isFetching } = useGetCreators(filter)
  const { data: filterResponse, isLoading: filterLoading } = useGetCreatorFilter()

  const countries = filterResponse?.data.country || []
  const industries = filterResponse?.data.industry || []
  const followersCounts = filterResponse?.data.followersCount || []
  const pagination = creatorsResponse?.pagination

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

  const onFilterFollowers = useCallback(
    (from: number, to: number) => setFilter(prev => ({
      ...prev,
      followers: {
        ...prev.followers,
        from,
        to
      }
    })),
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

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: getCreatorsKeys })
  }, [filter, queryClient])

  return (
    <main className='container min-h-dvh flex flex-col items-start justify-start py-12'>
      <div className='flex flex-wrap gap-3 mb-4'>
        <CreatorFilter
          label='Country'
          data={countries}
          isLoading={filterLoading}
          onSelect={value => onFilterCountry(value?.id)}
        />
        <CreatorFilter
          label='Industry'
          data={industries}
          isLoading={filterLoading}
          onSelect={value => onFilterIndustry(value?.id)}
        />
        {/* <CreatorFilter
          label='Followers'
          data={followersCounts}
          isLoading={filterLoading}
          onSelect={value => onFilter('followers', value?.id)}
        /> */}
        <PageRowFilter selected={value => onFilterPageRows(Number(value))} />
      </div>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='flex gap-2'>
            <span>List Creator</span>
            {isFetching && <Spinner />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {creatorsLoading || !creatorsResponse ? <Spinner /> : (
            <DataTable data={creatorsResponse.data} columns={columns} />
          )}
          <div className="flex gap-2 items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginatePage('prev')}
              disabled={Number(filter.pagination?.page) === 1 || isFetching}
            >
              Previous
            </Button>
            {isFetching ? <Spinner className='h-4 w-4' /> : (
              <span className='text-sm'>
                {pagination?.page} / {pagination?.totalPage}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginatePage('next')}
              disabled={Number(filter.pagination?.page) > Number(pagination?.totalPage) || isFetching}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
