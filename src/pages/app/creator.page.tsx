import { CreatorFilter } from '@/components/filters/creator-filter'
import { PageRowFilter } from '@/components/filters/page-rows'
import { Spinner } from '@/components/loading'
import { columns } from '@/components/tables/creator/columns'
import { DataTable } from '@/components/tables/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFilterCreator } from '@/lib/hooks'
import { getCreatorsKeys, useGetCreatorFilter, useGetCreators } from '@/services/creator/get-creator.service'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export default function CreatorPage() {
  const queryClient = useQueryClient()
  const {
    filter,
    onFilterAddress,
    onFilterCategory,
    onFilterEngagement,
    onFilterLanguage,
    onFilterCountry,
    onFilterIndustry,
    onFilterPageRows,
    paginatePage
  } = useFilterCreator()
  const { data: creatorsResponse, isLoading: creatorsLoading, isFetching } = useGetCreators(filter)
  const { data: filterResponse, isLoading: filterLoading } = useGetCreatorFilter()

  const countries = filterResponse?.data.country || []
  const industries = filterResponse?.data.industry || []
  const addresses = filterResponse?.data.address || []
  const categories = filterResponse?.data.category || []
  const engagements = filterResponse?.data.engagementRate || []
  const languages = filterResponse?.data.language || []
  const pagination = creatorsResponse?.pagination

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: getCreatorsKeys, fetchStatus: 'idle' })
  }, [queryClient, filter])

  return (
    <>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='flex gap-2'>
            <span>Creator Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-wrap gap-3 mb-4'>
          <CreatorFilter
            label='Address'
            data={addresses}
            isLoading={filterLoading}
            onSelect={value => onFilterAddress(value?.id)}
          />
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
          <CreatorFilter
            label='Category'
            data={categories}
            isLoading={filterLoading}
            onSelect={value => onFilterCategory(value?.id)}
          />
          <CreatorFilter
            label='Engagement'
            data={engagements}
            isLoading={filterLoading}
            onSelect={value => onFilterEngagement(value?.id)}
          />
          <CreatorFilter
            label='Language'
            data={languages}
            isLoading={filterLoading}
            onSelect={value => onFilterLanguage(value?.id)}
          />
          <PageRowFilter selected={value => onFilterPageRows(Number(value))} />
        </CardContent>
      </Card>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='flex gap-2'>
            <span>Creator List</span>
            {isFetching && <Spinner />}
          </CardTitle>
        </CardHeader>
        <CardContent className='w-full'>
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
    </>
  )
}
