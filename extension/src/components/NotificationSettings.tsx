// src/popup.tsx
import { Bell } from "lucide-react"
import { useState } from "react"

import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

function NotificationSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const handleNotificationToggle = async (enabled: boolean) => {
    setNotificationsEnabled(enabled)
    if (enabled) {
      // Request notification permission if needed
      const permission = await chrome.permissions.request({
        permissions: ["notifications"]
      })
      if (permission) {
        chrome.runtime.sendMessage({
          type: "ENABLE_NOTIFICATIONS"
        })
      }
    }
  }

  const testNotification = () => {
    chrome.runtime.sendMessage({
      type: "SHOW_NOTIFICATION",
      payload: {
        title: "Test Notification",
        message: "This is a test notification from NudgeMark!"
      }
    })

    new Notification("Hey there!!", {
      body: "This is a notification from your browser.",
      icon: "https://via.placeholder.com/64" // Optional icon
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Notifications</Label>
          <p className="text-sm text-muted-foreground">
            Receive bookmark reminders and updates
          </p>
        </div>
        <Switch
          checked={notificationsEnabled}
          onCheckedChange={handleNotificationToggle}
        />
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={testNotification}
        disabled={!notificationsEnabled}>
        <Bell className="mr-2 h-4 w-4" />
        Test Notification
      </Button>
    </div>
  )
}

export default NotificationSettings
// Add this component to your existing popup where needed
