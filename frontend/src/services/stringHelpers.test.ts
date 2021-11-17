import { normalizeForSearch } from './stringHelpers'

describe('normalizeForSearch', () => {
  it('should remove trailing spaces', () => {
    expect(normalizeForSearch(' text ')).toEqual('text')
  })

  it('should remove accents', () => {
    expect(normalizeForSearch('éÉ')).toEqual('ee')
  })

  it('should keep symbols', () => {
    expect(normalizeForSearch('zoom 100%')).toEqual('zoom 100%')
  })
})
