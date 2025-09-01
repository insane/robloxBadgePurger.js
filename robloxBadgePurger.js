let userId = "123456789";
let csrfToken;

async function setToken() {
  const response = await fetch("https://auth.roblox.com/v1/logout", {
    method: 'POST',
    headers: {
      'accept': 'application/json'
    },
    credentials: 'include'
  });

  if (response.status === 200 || response.status === 403) {
    csrfToken = response.headers.get("x-csrf-token");
  } else {
    console.error("Failed to set token, status code:", response.status);
  }
}

async function getAllBadges(userId) {
  const badges = [];
  let nextPageCursor = "";
  console.log("Fetching badges...");

  do {
    const url = `https://badges.roblox.com/v1/users/${userId}/badges?limit=10&sortOrder=Desc${nextPageCursor ? `&cursor=${nextPageCursor}` : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Failed to fetch badge, status code: ${response.status}`);
      return;
    }

    const data = await response.json();
    if (data.data && Array.isArray(data.data)) {
      badges.push(...data.data);
    }
    
    nextPageCursor = data.nextPageCursor;
    console.log(`Fetched ${badges.length} badges so far...`);
  } while (nextPageCursor);

  console.log(`Fetched ${badges.length} badges in total.`);
  return badges;
}

async function deleteBadge(badgeId) {
  await fetch(`https://badges.roblox.com/v1/user/badges/${badgeId}`, {
    method: 'DELETE',
    headers: {
      'accept': 'application/json',
      'x-csrf-token': csrfToken
    },
    credentials: 'include'
  });
}

async function deleteAllBadges(userId) {
  await setToken()
  const badges = await getAllBadges(userId);
  console.log("Deleting badges...");

  for (const badge of badges) {
    await deleteBadge(badge.id);
    console.log(`Deleted badge ${badge.id} - ${badge.name}`);
  }

  console.log("All badges deleted.");
}

deleteAllBadges(userId);
