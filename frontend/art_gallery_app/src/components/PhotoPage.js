import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function PhotoPage(props) {
    return (
        <Dialog open={props.isDialogOpen} fullWidth maxWidth="md">
            <div style={{
                backgroundColor: '#8BC6EC',
                backgroundImage: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)',
            }}>
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize:'x-large',
                    fontWeight:'bold',
                    fontFamily:'"Courier New", Courier, monospace',

                }}>
                    {props.selectedPhoto?.title}
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={props.handleCloseDialog}
                        aria-label="close"
                        sx={{
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '50%', marginRight: '20px', }}>
                        <img src={props.selectedPhoto?.img} alt={props.selectedPhoto?.title} style={{ width: '100%' }} />
                        <DialogContentText sx={{
                            mt: 1,
                            fontFamily:'"Courier New", Courier, monospace',
                            fontWeight:'bold'
                        }}>By: {props.selectedPhoto?.artist}</DialogContentText>
                    </div>
                    <div style={{ width: '45%' }}>
                        <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto', background: 'white' }}>
                            {(props.chatMessages[props.selectedPhoto?.title] || []).map((message, index) => (
                                <div key={index} style={{ margin: '10px 0' }}>
                                    {message.sender === props.profileName && message.sender !== "Unknown User" ?
                                        "Me: " + message.message
                                        :
                                        message.sender + ": " + message.message}
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Type a message"
                                value={props.msg}
                                onChange={(e) => props.setMsg(e.target.value)}
                                style={{ background: 'white',
                                fontFamily:'"Courier New", Courier, monospace', }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => props.handleSendMessage(props.selectedPhoto.title, props.msg)}
                                style={{ marginLeft: '10px',
                                fontFamily:'"Courier New", Courier, monospace', }}
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
}

export default PhotoPage;
