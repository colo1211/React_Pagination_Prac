import React , { useEffect , useState } from 'react';
import axios from 'axios'; 
import Posts from './components/Posts';
import Pagination from './components/Pagination';

const App = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지 당 게시물 개수
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(()=> {
    
    // 함수 생성
    const fetchPosts = async ()=>{
      setLoading(true); 
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false); 
    }
    
    // 함수 호출
    fetchPosts(); 
  },[]);


  console.log(posts); 

  // Get current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost =  indexOfLastPost - postsPerPage; 
  const currentPosts = posts.slice(indexofFirstPost, indexOfLastPost); 

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber); 

  return (
    <div className="container mt-5">
      <h1 className='text-primary mb-3'>My App</h1>
      <Posts posts={currentPosts} loading ={loading}/>
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}></Pagination>
    </div>
  );
}

export default App;
