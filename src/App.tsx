import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import UserList from "./components/UserList";

function App() {
  const queryClient = new QueryClient();
  const [selectedUserId, setSelectedUserId] = useState<number>(1);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-5 grid grid-cols-2">
        <UserList selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} />
        <Posts selectetdUserId={selectedUserId} />
        <CreatePost userId={selectedUserId} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
