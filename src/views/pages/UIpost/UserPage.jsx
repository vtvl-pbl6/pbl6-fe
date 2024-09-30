import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (<>
    <UserHeader />
    <UserPost likes={1200} replies={481} postImg="/post1.png" postTitle="Let's talk about Iphone 16"  />
    <UserPost likes={145} replies={345} postImg="/post2.png" postTitle="Let's talk about Airpod"  />
    <UserPost likes={112} replies={2003} postImg="/post3.png" postTitle="Let's talk about Steve Jobs"  />
    <UserPost likes={7070} replies={3002} postTitle="Threads đầu tiên nè!"  />
    </>
  )
}

export default UserPage