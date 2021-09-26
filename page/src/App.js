import React , { useEffect , useState } from 'react';
import axios from 'axios'; 
import Posts from './components/Posts';
import Pagination from './components/Pagination';

const App = () => {

  // 서버에서 불러온 데이터
  const [posts, setPosts] = useState([]);

  // 로딩 중을 나타내는 true/false
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
  const indexOfLastPost = currentPage * postsPerPage; // 1 * 10
  const indexOfFirstPost =  indexOfLastPost - postsPerPage; // 10 - 10
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  console.log('indexOfLastPost',indexOfLastPost,'indexofFirstPost',indexOfFirstPost,'currentPosts',currentPosts); 
  // indexOfLastPost 10 indexofFirstPost 0 


  // Change Page -> Pagination Component에 Props로 넘겨준다. 
  const paginate = (pageNumber) => setCurrentPage(pageNumber); 

  return (
    <div className="container mt-5">
      <h1 className='text-primary mb-3'>My App</h1>
        {/* 내용을 띄워주는 공간 */}
        <Posts posts={currentPosts} loading ={loading}/>
        {/* 페이지네이션 */}
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}></Pagination>
    </div>
  );
}

export default App;
