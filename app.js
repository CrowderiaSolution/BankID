import { app } from './web'
import { Server } from './config'

// import DB from './config/components/database'

app.listen(Server.PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`App listen to port: ${Server.PORT}`)
  }
})

// graceful shutdown
process.on('SIGTERM', () => {
  // desconect radis and other services
})
