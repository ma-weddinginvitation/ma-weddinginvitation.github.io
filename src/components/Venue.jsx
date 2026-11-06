import { MapPin, Navigation } from 'lucide-react'
import { ADDRESS_FULL, MAPS_DIRECTIONS_URL, MAPS_VIEW_URL } from '../data/wedding'
import { Divider } from './Ornaments'
import Reveal from './Reveal'
import VenueIllustration from './VenueIllustration'
import './Venue.css'

export default function Venue() {
  return (
    <section id="venue" className="section surface-ivory venue">
      <div className="venue__layout">
        <Reveal className="venue__frame" y={40}>
          <VenueIllustration />
        </Reveal>

        <div className="venue__details">
          <Reveal className="venue__pin">
            <MapPin size={28} strokeWidth={1.2} aria-hidden="true" />
          </Reveal>
          <Reveal as="h2" className="venue__name foil-dark" delay={0.1}>
            DRIZZLE ELITE MAHAL
          </Reveal>
          <Reveal delay={0.2}>
            <Divider />
          </Reveal>
          <Reveal as="p" className="venue__address" delay={0.25}>
            {ADDRESS_FULL}
          </Reveal>
          <Reveal className="venue__actions" delay={0.35}>
            <a className="gold-button gold-button--maroon" href={MAPS_VIEW_URL} target="_blank" rel="noopener noreferrer">
              <MapPin size={18} strokeWidth={1.6} aria-hidden="true" />
              VIEW LOCATION ON GOOGLE MAPS
            </a>
            <a className="gold-button gold-button--maroon" href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
              <Navigation size={18} strokeWidth={1.6} aria-hidden="true" />
              GET DIRECTIONS
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
