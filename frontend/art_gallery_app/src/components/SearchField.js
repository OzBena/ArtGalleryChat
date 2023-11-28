import * as React from 'react';
import TextField from '@mui/material/TextField';


function SearchField(props) {
    return (
        <TextField id="outlined-search" label="Search" type="search" sx={{
            width: 990,
        }} InputProps={{
            sx: { borderRadius: 3 },
        }}
            onChange={(e) => props.setSearchQuery(e.target.value)}
        />
    )
}

export default SearchField

