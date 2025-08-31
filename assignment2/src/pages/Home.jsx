import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import JobListing from '../components/JobListing';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';

const Home = () => {
    const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });

    const handleSearch = (searchData) => {
        setSearchFilter(searchData);
    };

    return (
        <div>
            <Navbar />
            <Hero onSearch={handleSearch} />
            <JobListing searchFilter={searchFilter} />
            <AppDownload />
            <Footer />
        </div>
    );
};

export default Home;
