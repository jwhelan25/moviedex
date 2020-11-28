const app = reqcuire('./app.js')

const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})