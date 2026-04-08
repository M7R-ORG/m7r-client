const config = {
  app: {
    port: process.env.PORT,
    publicPath: process.env.PUBLIC_URL
  },
  server: {
    url: process.env.REACT_APP_SERVER_URL,
    timeout: 20000
  }
}

export default config
