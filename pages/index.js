export default function Index() {
  return <></>
}

export async function getServerSideProps({ res }) {
  if (res) {
    res.writeHead(301, {
      Location: '/blog',
    });
    res.end();
  }
  return {};
}
