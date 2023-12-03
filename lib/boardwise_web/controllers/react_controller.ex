defmodule BoardWiseWeb.ReactController do
  use BoardWiseWeb, :controller

  def mount(conn, _params) do
    # Set `layout` to false to bypass the app layout. The goal here is to
    # eventually migrate away from the React app as is defined in favor of
    # Phoenix related components. Exposing this mount point is the first step
    # in migrating away from Vercel into a self-hosted solution.
    render(conn, :mount, layout: false)
  end
end
