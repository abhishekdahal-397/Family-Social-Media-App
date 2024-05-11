import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./IncomingRequest.css";

const IncomingRequest = () => {
  const [friendRequest, setFriendRequest] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [senders, setSenders] = useState([]);
  const userId = useSelector((state) => state.user.userId);
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const fetchFriendRequest = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/friend-requests"
        );
        console.log(response.data.friendRequests);
        setFriendRequest(response.data); //  objects with success true and sender arrays
        setSenders(response.data.friendRequests); // all sender arrays

        if (senders.length > 0) {
          console.log("this is sender 0");

          console.log(senders[0].sender); //get the specific sender id
        } else {
          console.log("no senders");
        }
      } catch (error) {
        console.error("Error fetching friend request:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriendRequest();
  }, []);

  useEffect(() => {
    // Function to filter out duplicate friend requests
    function filterDuplicates() {
      const uniqueRequests = senders.reduce((acc, curr) => {
        const found = acc.some((item) => item.sender === curr.sender);
        if (!found) {
          acc.push(curr);
        }
        return acc;
      }, []);
      setSenders(uniqueRequests);
    }
    console.log("this is filtered array");

    console.log(senders); // print all the uniqueRequests

    filterDuplicates();
  }, [friendRequest]);
  useEffect(() => {
    console.log("this is filtered array after filtering and these are senders");

    console.log(senders); // print all the uniqueRequests after filtering
  }, [senders]);
  useEffect(() => {
    const getSenders = async () => {
      try {
        const usersData = await Promise.all(
          senders.map(async (sender) => {
            const response = await axios.get(
              `http://localhost:3001/api/users/getUser/${sender.sender}`
            );
            return response.data;
          })
        );

        console.log("These are the users:", usersData);
        setUsersData(usersData);

        // Now you have an array of users data, you can do something with it, such as setting it to state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getSenders();
  }, [senders]);

  return (
    <div className="incoming-request">
      {usersData.map((user, index) => (
        <div key={index}>
          <img className="user-image" src={user.user.image} alt="User" />
          <p>{user.user.username}</p>
          <button className="confirmbtn">Confirm</button>
          <button className="deletebtn">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default IncomingRequest;
