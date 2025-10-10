import { describe, it, expect } from 'vitest'
import { mapUser } from './map-user'
import type { SupbaseProfilesItem } from '../services/user/user'
import type { User } from '@/domain/log-in'

describe('mapUser', () => {
  it('maps all fields from Supabase profile item to User correctly', () => {
    const input: SupbaseProfilesItem = {
      id: 'user-123',
      name: 'Alice',
      last_name: 'Johnson',
      picture_url: 'https://example.com/alice.png',
      created_at: '',
    }

    const expected: User = {
      id: 'user-123',
      name: 'Alice',
      lastName: 'Johnson',
      pictureUrl: 'https://example.com/alice.png',
    }

    expect(mapUser(input)).toEqual(expected)
  })

  it('defaults lastName to an empty string if last_name is null', () => {
    const input: SupbaseProfilesItem = {
      id: 'user-456',
      name: 'Bob',
      last_name: null,
      picture_url: null,
      created_at: '',
    }

    const expected: User = {
      id: 'user-456',
      name: 'Bob',
      lastName: '',
      pictureUrl: null,
    }

    expect(mapUser(input)).toEqual(expected)
  })

  it('handles missing optional fields gracefully', () => {
    const input = {
      id: 'user-789',
      name: 'Charlie',
      last_name: null,
      picture_url: null,
      created_at: '',
    } as SupbaseProfilesItem

    const result = mapUser(input)

    expect(result).toEqual({
      id: 'user-789',
      name: 'Charlie',
      lastName: '',
      pictureUrl: null,
    })
  })
})
