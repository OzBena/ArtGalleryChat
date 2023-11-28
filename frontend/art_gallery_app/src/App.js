import { _Photos } from './services/atoms';
import './App.css';
import PhotoCard from './components/PhotoCard';
import TextField from '@mui/material/TextField';
import SearchField from './components/SearchField';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import PhotoPage from './components/PhotoPage';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/effect-coverflow';
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'

import { useRecoilState } from 'recoil';





function App() {
  const [ws, setWs] = useState(null);

  const [photos, setPhotos] = useRecoilState(_Photos)
  const [searchQuery, setSearchQuery] = useState("")
  const [profileName, setProfileName] = useState("Unknown User")

  const [chatMessages, setChatMessages] = useState({});
  const [msg, setMsg] = useState("")

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleSendMessage = (id, message) => {
    setChatMessages(prevState => ({
      ...prevState,
      [id]: [...(prevState[id] || []), { sender: profileName, message: message }],
    }));

    if (ws) {
      const messageObj = { id, message: { sender: profileName, message: message } };
      ws.send(JSON.stringify(messageObj));
    }

    setMsg("");
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPhoto(null);
  };

  const filteredPhotos = photos.filter(
    (photo) =>
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');

    websocket.onopen = () => { };

    websocket.onmessage = (event) => {
      try {
        const receivedMessageObj = JSON.parse(event.data);
        setChatMessages((prevState) => ({
          ...prevState,
          [receivedMessageObj.id]: [
            ...(prevState[receivedMessageObj.id] || []),
            receivedMessageObj.message,
          ],
        }));
      } catch (error) {
        console.error('Failed to parse message', error);
      }
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  return (
    <div className="App">
      <div className='headerDiv'>
        Art Chat
      </div>
      <div className='Photos-container'>
        {filteredPhotos.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            grabCursor={true}
            className="photo-slider"
            effect={'coverflow'}
            centeredSlides={true}
            coverflowEffect={
              {
                rotate: 5,
                stretch: 0,
                depth: 50,
                modifier: 2.5,
              }
            }
           
            modules={[EffectCoverflow,Pagination,Navigation]}
            
          >
            {filteredPhotos.map((photo, index) => (
              <SwiperSlide key={index} onClick={() => handlePhotoClick(photo)} className="Photo-item">
                <PhotoCard
                  
                  id={photo.title}
                  key={index}
                  photo={photo}
                  img={photo.img}
                  title={photo.title}
                  artist={photo.artist}
                  description={photo.description}
                />
              </SwiperSlide>

            ))}
            <PhotoPage
              isDialogOpen={isDialogOpen}
              handleCloseDialog={handleCloseDialog}
              selectedPhoto={selectedPhoto}
              chatMessages={chatMessages}
              handleSendMessage={handleSendMessage}
              msg={msg}
              setMsg={setMsg}
              profileName={profileName}
            />
          </Swiper>

        ) : (
          <Typography variant="h6" component="div" sx={{ p: 2, textAlign: 'center' }}>
            Sorry.. here is no photos that match your search
          </Typography>
        )}
      </div>
      <div className='Serch-input'>
        <SearchField setSearchQuery={setSearchQuery} />
        <TextField id="outlined-basic" label="Profile name" variant="outlined"
          onChange={(e) => e.target.value === "" ?
            setProfileName("Unknown User")
            :
            setProfileName(e.target.value)}
          sx={{
            width: 300,
          }}
          InputProps={{
            sx: { borderRadius: 3 },
          }}
        />
      </div>
    </div>
  );
}

export default App;










