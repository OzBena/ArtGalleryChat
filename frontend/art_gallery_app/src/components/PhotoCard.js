import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

export default function PhotoCard(props) {
    const [tooltipContent, setTooltipContent] = useState("");

    const handleMouseEnter = (e) => {
        const image = e.target;
        setTooltipContent(`Resolution: ${image.naturalWidth} x ${image.naturalHeight}\nSize: ${Math.round(image.fileSize / 1024)} KB`);
    };

    return (
        <Card sx={{
            width: 435,
            maxWidth: 435,
            textAlign: 'left',
        }}>
            <CardActionArea>
                <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>{tooltipContent}</div>} placement="top" arrow>
                    <CardMedia
                        component="img"
                        height="240"
                        image={props.img}
                        alt={props.title}
                        onMouseEnter={handleMouseEnter}
                        onLoad={(e) => {
                            fetch(props.img)
                            .then(response => response.blob())
                            .then(blob => {
                                e.target.fileSize = blob.size;
                            })
                        }}
                    />
                </Tooltip>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{
                        fontFamily:'"Courier New", Courier, monospace', fontWeight:'bold'
                    }}>
                        {props.title}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" color="text.secondary" style={{
                        fontFamily:'"Courier New", Courier, monospace',
                    }}>
                        by {props.artist}
                    </Typography>
                    <Typography variant="body2" sx={{
                        overflowY: "auto",
                        height: "150px",
                        maxHeight: "150px",
                    }}>
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
