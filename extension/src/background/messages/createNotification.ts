import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { title, message, url } = req.body

  new Notification("Reminder! You have misssed your Bookmark!", {
    body: message,
    icon: "https://via.placeholder.com/64"
  })

  res.send({ success: true })
}

export default handler
