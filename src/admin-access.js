// Do not choose login or first-time setup until the server confirms its state.
export async function readAdminAccess(request) {
  const [status, auth] = await Promise.all([
    request("/api/status"),
    request("/api/auth/me"),
  ]);
  if (
    typeof status?.adminReady !== "boolean" ||
    typeof status?.setupTokenRequired !== "boolean" ||
    !auth ||
    !Object.hasOwn(auth, "user")
  ) {
    throw Error(
      "The server could not confirm administrator setup. Please retry.",
    );
  }
  return {
    setup: !status.adminReady,
    setupTokenRequired: status.setupTokenRequired,
    user: auth.user?.role === "admin" ? auth.user : null,
  };
}
