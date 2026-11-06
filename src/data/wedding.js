// The single source of truth for every wedding detail shown on the site.

export const HOSTS = 'Mr. Syed Ibrahim & Mrs. Najiba Begam'
export const GROOM = 'Meeran Mydeen'
export const BRIDE = 'Amra Banu'
export const SHORT_NAMES = 'Meeran & Amra'

export const DATE_LONG = 'Sunday, 10 January 2027'
export const TIME_RANGE = '11:00 AM – 12:00 PM'

export const VENUE = 'Drizzle Elite Mahal'
export const ADDRESS_SHORT = 'Courtallam, Tamil Nadu 627805'
export const ADDRESS_FULL = 'Courtallam, Tamil Nadu 627805, India'

// 11:00 AM Indian Standard Time, independent of the guest's own timezone.
export const WEDDING_INSTANT = new Date('2027-01-10T11:00:00+05:30')

const mapsQuery = encodeURIComponent(`${VENUE}, ${ADDRESS_FULL}`)
export const MAPS_VIEW_URL = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`

export function whatsappShareUrl(siteUrl) {
  const message = [
    '*A Family Wedding Invitation*',
    '',
    `${HOSTS} cordially invite you and your family to grace the wedding celebration of their beloved son`,
    '',
    `*${GROOM}* with *${BRIDE}*`,
    '',
    DATE_LONG,
    TIME_RANGE,
    `${VENUE}, ${ADDRESS_SHORT}`,
    '',
    'Open your invitation:',
    siteUrl,
  ].join('\n')
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

export const SECTIONS = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'invitation', label: 'Invitation' },
  { id: 'date', label: 'Date & Time' },
  { id: 'venue', label: 'Venue' },
  { id: 'blessings', label: 'Blessings' },
]
