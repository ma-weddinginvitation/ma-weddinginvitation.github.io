// The hosts' names always break at the ampersand, never in the middle of a name.
export default function Hosts() {
  return (
    <>
      <span style={{ display: 'inline-block' }}>Mr. Syed Ibrahim &amp;</span>{' '}
      <span style={{ display: 'inline-block' }}>Mrs. Najiba Begam</span>
    </>
  )
}
