import Navbar from "../components/Navbar"

const Home = () => {
  const { filters } = useContext(FiltersContext);

  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default Home
