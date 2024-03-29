import "./home.scss";
import { AddCircle, Edit, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { IVideo } from "../../types/global.typing";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const redirect = useNavigate();

  useEffect(() => {
    axios
      .get<IVideo[]>(baseUrl)
      .then((response) => setVideos(response.data))
      .catch((error) => alert(JSON.stringify(error)));
  }, []);

  const redirectToEdit = (videoId: string) => {
    redirect(`/edit-video/${videoId}`);
  };

  const redirectToDelete = (videoId: string) => {
    redirect(`/delete-video/${videoId}`);
  };

  return (
    <div className="home">
      <div className="heading">
        <h1>Video List</h1>
        <span>
          <AddCircle onClick={() => redirect("/add-video")} />
        </span>
      </div>

      <div className="cards">
        {videos.length === 0 && <h1 className="no-video">Your Video List is Empty...</h1>}
        {videos.map((item) => (
          <div key={item.id} className="card">
            <div className="left">
              <div className="title">
                <span>{item.title}</span>
                <span className="time">{moment(item.createdAt).fromNow()}</span>
              </div>
              <div className="url">
                <span>{item.url}</span>
              </div>
            </div>

            <div className="right">
              <div className="btns">
                <Edit
                  className="edit-btn"
                  onClick={() => redirectToEdit(item.id)}
                />
                <Delete
                  className="delete-btn"
                  onClick={() => redirectToDelete(item.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
