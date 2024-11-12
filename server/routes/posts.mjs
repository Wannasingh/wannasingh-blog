import express from 'express'
import supabase from '../utils/db.mjs'

const postRouter = express.Router()

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')

    if (error) throw error

    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Add a new post
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, author }])
      .select()

    if (error) throw error

    res.status(201).json(data[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ... update other routes similarly

export default postRouter