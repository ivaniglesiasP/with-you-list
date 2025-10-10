import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mapListItems } from './map-list-items'
import { mapUser } from './map-user'
import type { SupbaseList } from '../services/list/list'
import type { ListItem } from '@/domain/list'
import { User } from '@/domain/log-in'

// --- Mock mapUser --------------------------------------------------
vi.mock('./map-user', () => ({
  mapUser: vi.fn(),
}))

const mockMapUser = vi.mocked(mapUser)

describe('mapListItems', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('maps Supabase rows into ListItem objects correctly', () => {
    const supabaseList: SupbaseList = [
      {
        id: '1',
        created_at: '2025-10-10T12:00:00Z',
        description: 'First task',
        to_do_help_text: 'Help text 1',
        profiles: {
          id: 'u1',
          name: 'John',
          last_name: 'Doe',
          picture_url: 'https://example.com/john.jpg',
          created_at: '',
        },
        user_id: 'u1',
        done: false,
        done_at: null,
      },
      {
        id: '2',
        created_at: '2025-10-11T13:00:00Z',
        description: 'Second task',
        to_do_help_text: null,
        profiles: {
          id: 'u2',
          name: 'Jane',
          last_name: 'Smith',
          picture_url: null,
          created_at: '',
        },
        user_id: 'u2',
        done: true,
        done_at: null,
      },
    ]

    const mockUsers: User[] = [
      {
        id: 'u1',
        name: 'John',
        lastName: 'Doe',
        pictureUrl: 'https://example.com/john.jpg',
      },
      {
        id: 'u2',
        name: 'Jane',
        lastName: 'Smith',
        pictureUrl: null,
      },
    ]

    mockMapUser
      .mockReturnValueOnce(mockUsers[0])
      .mockReturnValueOnce(mockUsers[1])

    const result = mapListItems(supabaseList)

    const expected: ListItem[] = [
      {
        id: '1',
        createdAt: '2025-10-10T12:00:00Z',
        description: 'First task',
        toDoHelpText: 'Help text 1',
        done: false,
        doneAt: null,
        user: mockUsers[0],
      },
      {
        id: '2',
        createdAt: '2025-10-11T13:00:00Z',
        description: 'Second task',
        toDoHelpText: '',
        doneAt: null,
        done: true,
        user: mockUsers[1],
      },
    ]

    expect(result).toEqual(expected)
    expect(mockMapUser).toHaveBeenCalledTimes(2)
  })

  it('returns an empty array when given an empty list', () => {
    const result = mapListItems([])
    expect(result).toEqual([])
    expect(mockMapUser).not.toHaveBeenCalled()
  })
})
