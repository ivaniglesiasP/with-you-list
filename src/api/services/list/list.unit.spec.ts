import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mapListItems } from '@/api/mapping/map-list-items'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/api/supabase/database.types'
import type { ListItem } from '@/domain/list'
import { getList, SupabaseListItem } from './list'

// --- Mocks ---------------------------------------------------------
vi.mock('@/api/mapping/map-list-items', () => ({
  mapListItems: vi.fn(),
}))

const mockMapListItems = vi.mocked(mapListItems)

const createMockClient = (
  data?: SupabaseListItem[],
  opts?: { error?: boolean },
): SupabaseClient<Database['public']> => {
  return {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn(async () => ({
        data: opts?.error ? null : data || null,
        error: opts?.error ? new Error('query failed') : null,
      })),
    })),
  } as unknown as SupabaseClient<Database['public']>
}

describe('getList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns an empty array when query fails', async () => {
    const client = createMockClient(undefined, { error: true })
    const result = await getList({ client })
    expect(result).toEqual([])
    expect(mockMapListItems).not.toHaveBeenCalled()
  })

  it('returns an empty array when data is null', async () => {
    const client = createMockClient()
    const result = await getList({ client })
    expect(result).toEqual([])
    expect(mockMapListItems).not.toHaveBeenCalled()
  })

  it('returns mapped list when data exists', async () => {
    const mockData: SupabaseListItem[] = [
      {
        id: '1',
        description: 'Test item',
        to_do_help_text: 'Help me',
        created_at: '2024-10-10T00:00:00Z',
        user_id: 'u1',
        done_at: null,
        done: false,
        profiles: {
          id: 'u1',
          name: 'Alice',
          last_name: 'Johnson',
          picture_url: 'https://example.com/alice.png',
          created_at: '2024-10-09T00:00:00Z',
        },
      },
    ]

    const mappedResult: ListItem[] = [
      {
        id: '1',
        createdAt: '2024-10-10T00:00:00Z',
        description: 'Test item',
        toDoHelpText: 'Help me',
        doneAt: null,
        done: false,
        user: {
          id: 'u1',
          name: 'Alice',
          lastName: 'Johnson',
          pictureUrl: 'https://example.com/alice.png',
        },
      },
    ]

    const client = createMockClient(mockData)
    mockMapListItems.mockReturnValueOnce(mappedResult)

    const result = await getList({ client })

    expect(mockMapListItems).toHaveBeenCalledWith(mockData)
    expect(result).toEqual(mappedResult)
  })
})
