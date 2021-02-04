import SearchPage from "./searchbar";

const Home = () => {
  localStorage.clear();
  return (
    <div className="bg-img">
      <h1 className="text-center">Welcome to Job Portal</h1>
      <h4 className="text-center">Trending Jobs</h4>
      <SearchPage />
      {/*<center>
        <img src="https://uaewebsitedevelopment.com/wp-content/uploads/2019/01/developing-a-unique-job-portal.jpg"></img>
      </center>*/}
    </div>
  );
};
export default Home;
