// The hosts' names always break at the ampersand, never in the middle of a name.
// The titles use the body font: the capitals font has no lowercase, so "mr." would show as "MR.".
const title = { fontFamily: 'var(--font-body)', letterSpacing: 0 }

export default function Hosts() {
  return (
    <>
      <span style={{ display: 'inline-block' }}>
        <span style={title}>mr.</span> Syed Ibrahim &amp;
      </span>{' '}
      <span style={{ display: 'inline-block' }}>
        <span style={title}>mrs.</span> Najiba Begam
      </span>
    </>
  )
}
