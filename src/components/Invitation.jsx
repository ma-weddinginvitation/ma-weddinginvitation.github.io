import { ADDRESS_SHORT, BRIDE, DATE_LONG, GROOM, TIME_RANGE, VENUE } from '../data/wedding'
import { Corners, Divider, FloralSpray } from './Ornaments'
import Hosts from './Hosts'
import Reveal from './Reveal'
import './Invitation.css'

export default function Invitation() {
  return (
    <section id="invitation" className="section surface-silk invitation">
      <FloralSpray className="invitation__spray invitation__spray--l" />
      <FloralSpray className="invitation__spray invitation__spray--r" flip />

      <Reveal as="article" className="invite-card" y={44}>
        <span className="invite-card__frame" aria-hidden="true" />
        <Corners />

        <div className="invite-card__body">
          <Reveal as="h2" className="eyebrow invite-card__title" delay={0.15}>
            A Family Wedding Invitation
          </Reveal>
          <Reveal delay={0.25}>
            <Divider />
          </Reveal>
          <Reveal as="p" className="invite-card__hosts" delay={0.3}>
            <Hosts />
          </Reveal>
          <Reveal as="p" className="invite-card__line" delay={0.4}>
            Cordially invite you and your family to grace the wedding celebration of our beloved son
          </Reveal>
          <Reveal as="p" className="invite-card__name foil-dark" delay={0.5}>
            {GROOM}
          </Reveal>
          <Reveal as="p" className="invite-card__with" delay={0.55}>
            with
          </Reveal>
          <Reveal as="p" className="invite-card__name foil-dark" delay={0.6}>
            {BRIDE}
          </Reveal>
          <Reveal className="invite-card__details" delay={0.2}>
            <p className="invite-card__date">{DATE_LONG}</p>
            <p>{TIME_RANGE}</p>
            <p className="invite-card__venue">{VENUE}</p>
            <p>{ADDRESS_SHORT}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <Divider />
          </Reveal>
          <Reveal as="p" className="invite-card__line invite-card__blessing" delay={0.2}>
            Your presence and blessings will make this celebration truly special.
          </Reveal>
          <Reveal as="p" className="invite-card__regards" delay={0.2}>
            With warm regards,
          </Reveal>
          <Reveal as="p" className="invite-card__signoff" delay={0.2}>
            <Hosts />
          </Reveal>
        </div>
      </Reveal>
    </section>
  )
}
