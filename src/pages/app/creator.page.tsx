import { DropdownFilter } from '@/components/filters/dropdown-filter'
import { TextFilter } from '@/components/filters/text-filter'
import { Spinner } from '@/components/loading'
import { columns } from '@/components/tables/creator/columns'
import { DataTable } from '@/components/tables/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { pageRows } from '@/lib/consts'
import { useFilterCreator } from '@/lib/hooks'
import { getCreatorsKeys, useGetCreatorFilter, useGetCreators } from '@/services/creator/get-creator.service'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export default function CreatorPage() {
  const queryClient = useQueryClient()
  const {
    filter,
    onFilterCategory,
    onFilterEngagement,
    onFilterLanguage,
    onFilterCountry,
    onFilterIndustry,
    onFilterContact,
    onFilterPageRows,
    onFilterFollowers,
    onFilterAddress,
    onFilterKeywords,
    onFilterHashtags,
    paginatePage
  } = useFilterCreator()
  const { data: creatorsResponse, isLoading: creatorsLoading, isFetching } = useGetCreators(filter)
  const { data: filterResponse, isLoading: filterLoading } = useGetCreatorFilter()

  const countries = filterResponse?.data?.country || []
  const industries = filterResponse?.data?.industry || []
  const categories = filterResponse?.data?.category || []
  const engagements = filterResponse?.data?.engagementRate || []
  const languages = filterResponse?.data?.language || []
  const contancts = filterResponse?.data?.contactBy || []
  const followers = filterResponse?.data?.follower || []
  const pagination = creatorsResponse?.pagination

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: getCreatorsKeys, fetchStatus: 'idle' })
  }, [queryClient, filter])

  if (creatorsResponse?.error || filterResponse?.error)
    return 'Something error, please refresh the page.'

  return (
    <>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='flex gap-2'>
            <span>Creator Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='flex flex-wrap gap-3'>
            <div>
              <Label>Followers</Label>
              <div className='flex gap-3'>
                <DropdownFilter
                  width={100}
                  label='From'
                  hideLabel
                  data={followers}
                  isLoading={filterLoading}
                  onSelect={value => onFilterFollowers({ from: value?.id ? Number(value.id) : undefined })}
                />
                <DropdownFilter
                  width={100}
                  label='To'
                  hideLabel
                  data={followers}
                  isLoading={filterLoading}
                  onSelect={value => onFilterFollowers({ to: value?.id ? Number(value.id) : undefined })}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-wrap gap-3'>
            <TextFilter
              label='Address'
              onChange={value => onFilterAddress(value)}
            />
            <TextFilter
              label='Keywords'
              onChange={value => onFilterKeywords(value)}
            />
            <TextFilter
              label='Hashtags'
              onChange={value => onFilterHashtags(value)}
            />
          </div>
          <div className='flex flex-wrap gap-3'>
            <DropdownFilter
              label='Country'
              data={countries}
              isLoading={filterLoading}
              onSelect={value => onFilterCountry(value?.id)}
            />
            <DropdownFilter
              label='Industry'
              data={industries}
              isLoading={filterLoading}
              onSelect={value => onFilterIndustry(value?.id)}
            />
            <DropdownFilter
              label='Category'
              data={categories}
              isLoading={filterLoading}
              onSelect={value => onFilterCategory(value?.id)}
            />
            <DropdownFilter
              label='Engagement'
              data={engagements}
              isLoading={filterLoading}
              onSelect={value => onFilterEngagement(value?.id)}
            />
            <DropdownFilter
              label='Language'
              data={languages}
              isLoading={filterLoading}
              onSelect={value => onFilterLanguage(value?.id)}
            />
            <DropdownFilter
              label='Contact By'
              data={contancts}
              isLoading={filterLoading}
              onSelect={value => onFilterContact(value?.id)}
            />
            <DropdownFilter
              label='Page Rows'
              data={pageRows}
              isLoading={false}
              onSelect={value => onFilterPageRows(Number(value?.value || 10))}
            />
          </div>
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
          {creatorsLoading || !creatorsResponse ? (
            <p className='text-sm'>Fetching creators...</p>
          ) : (
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
              disabled={Number(filter.pagination?.page) >= Number(pagination?.totalPage) || isFetching}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
