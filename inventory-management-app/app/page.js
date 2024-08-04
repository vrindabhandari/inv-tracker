/*'use client'
import Image from "next/image";
import {useState, useEffect} from 'react'
import {firestore} from "@/firebase"
import {Box, Modal, Typography, Stack, TextField, Button} from "@mui/material"
import {collection, deleteDoc, doc, getDocs, query, getDoc, setDoc} from "firebase/firestore";

export default function Home() { hiiii
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [search, setSearch] = useState('');


  const updateInventory = async() => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) =>{
      inventoryList.push({
        name: doc.id, ...doc.data()
      })
    })
    console.log("list is:" + inventoryList)
    setInventory(inventoryList)
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const addItem = async(item) =>{
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const{quantity} = docSnap.data()
      await setDoc(docRef, {quantity : quantity + 1})
      inventory.push("abc");
    }
    else{
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }

  const removeItem = async(item) =>{
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const{quantity} = docSnap.data()
      if (quantity === 1){
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity : quantity - 1})
      }
    }
    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const filteredInventory = inventory.filter(({name}) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box width = "100vw" height = "100vh" display = "flex"  flexDirection ="column" justifyContent = "center" alignItems = "center" gap = {2}>
      <Modal open = {open} onClose = {handleClose}>
        <Box
        position = "absolute"
        top = "50%"
        left = "50%"
        width = {400}
        bgcolor = "white"
        border = "2px solid #000"
        boxShadow = {24}
        p = {4}
        display = "flex"
        flexDirection = "column"
        gap = {3}
        sx = {{
          transform : 'translate(-50%, 50%)',
        }}
        >
          <Typography variant = "h6"> Add Item </Typography>
          <Stack width = "100%" direction = "row" spacing = {2}>
            <TextField
            variant = 'outlined'
            fullWidth
            value = {itemName}
            onChange = {(e) =>{
              setItemName(e.target.value)
            }}
          />
          <Button
           variant = "outlined"
           onClick = {() =>{
            addItem(itemName)
            setItemName('')
            handleClose()
          }}>Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant = "contained"
      onClick = {() => {
        handleOpen()
      }}
      >
        Add New Item 
      </Button>
      <Box border = "1px solid #333">
        <Box width = "800px" height = "100px" bgcolor = "#ADD836" display = "flex" alignItems = "center" justifyContent = "center">
          <Typography variant = "h2" color = "#333">
            Inventory Items  
          </Typography>
        </Box>

        <TextField // Search input field
          variant="outlined"
          fullWidth
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

      <Stack width = "800px" height = "300px" spacing = {2} overflow = "auto">
        {
          filteredInventory.map(({name, quantity}) =>(
            <Box 
            key = {name} 
            width = "100%" 
            minHeight = "150px" 
            display = "flex"
            alignItems = "center" 
            justifyContent = "space-between" 
            bgColor = "#f0f0f0" 
            padding = {5}
            >
              <Typography 
              variant = 'h3' 
              color = '#333' 
              textAlign ="center"
              >{name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography 
              variant = 'h3' 
              color = '#333' 
              textAlign ="center"
              >{quantity}
              </Typography>
              <Stack direction = "row" spacing={2}>
              <Button variant = "contained" onClick={() => {
                addItem(name)
              }}> Add</Button>
              <Button variant = "contained" onClick = {() =>{
                removeItem(name)
              }}> Remove </Button>
            </Stack>
            </Box>
          ))}
      </Stack>
      </Box>
    </Box>
)
}*/

'use client'
import { useState, useEffect } from 'react';
import { firestore } from "@/firebase";
import { Box, Modal, Typography, Stack, TextField, Button, Paper, IconButton } from "@mui/material";
import { collection, deleteDoc, doc, getDocs, query, getDoc, setDoc } from "firebase/firestore";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [search, setSearch] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id, ...doc.data()
      });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center" bgcolor="#f0f4f8" padding={4}>
      <Typography variant="h3" sx={{ marginBottom: 4, fontWeight: 'bold', color: '#1976d2' }}>
        Inventory Tracker
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleOpen}
        sx={{ marginBottom: 4, borderRadius: 25, paddingX: 4 }}
      >
        Add New Item
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="#ffffff"
          borderRadius={3}
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant='outlined'
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
              sx={{ backgroundColor: '#f9f9f9' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
              sx={{ borderRadius: 25 }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 3, maxWidth: '600px', backgroundColor: '#ffffff' }}
      />

      <Stack spacing={2} width="100%" maxWidth="800px" overflow="auto">
        {filteredInventory.map(({ name, quantity }) => (
          <Paper
            key={name}
            elevation={3}
            sx={{
              padding: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: '#ffffff',
              borderRadius: 2,
              boxShadow: 3
            }}
          >
            <Box display="flex" alignItems="center">
              <Typography
                variant='h6'
                color='textPrimary'
                sx={{ textTransform: 'capitalize', marginRight: 2, fontWeight: 'bold' }}
              >
                {name}
              </Typography>
              <Typography
                variant='body1'
                color='textSecondary'
              >
                Quantity: {quantity}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <IconButton color="primary" onClick={() => addItem(name)}>
                <AddIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => removeItem(name)}>
                <RemoveIcon />
              </IconButton>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  )
}
