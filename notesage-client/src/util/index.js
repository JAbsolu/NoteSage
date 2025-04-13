export const createNotificationList = async (userId) => {
    try {
      const response = await fetch(`http://localhost/create-notification-list?id=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json();

      if (!response.ok) {
        console.log("error creating notification list", result.message);
        return;
      }

      console.log(result.message);

    } catch (error) {
      console.log(error.message);
    }
}

export const createNotificationListOnLogin = async (userId) => {
    try {
        const response = await fetch(`http://localhost/notifications?id=${userId}`, {
            method: "GET",
            headers: {"Content-Type":"application/json"}
        })

        if (response.status == 404) {
            await createNotificationList(userId);
            console.log("New Notification list created on login");
        }
    } catch (error) {
        console.log(error);
        await createNotificationList(userId);
    }
}