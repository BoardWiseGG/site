# BoardWise Website

This is the repository containing both the [Phoenix](https://www.phoenixframework.org/)
backend and [React](https://react.dev/) frontend of [boardwise.gg](https://www.boardwise.gg).
We use [nix](https://nixos.org/) for both development and release.

## Quickstart

[direnv](https://direnv.net/) can be used to launch a dev shell upon entering
this directory (refer to `.envrc`). Otherwise run via:
```bash
$ nix develop
```
Once you have a nix development shell open, create a new Postgres cluster at
`/db`:
```bash
$ pg_ctl -D db init
```
To start the database, run the following:
```bash
$ pg_ctl -D db -l db/logfile -o --unix_socket_directories=@boardwise start
```
In the above command, `@boardwise` refers to an [abstract socket name](https://www.postgresql.org/docs/15/runtime-config-connection.html#GUC-UNIX-SOCKET-DIRECTORIES).
Rename to whatever is appropriate for your use case. To then connect to this
database instance, run:
```bash
$ psql -h @boardwise
```
To later shut the database down, run:
```bash
$ pg_ctl -D db stop
```
Once the database is running, you can invoke the following Phoenix setup
commands:
```bash
$ mix ecto.setup
$ mix assets.setup
$ cd assets && npm install
```
Afterward start the local server:
```bash
$ mix phx.server
```

## Release

To create a new [Mix release](https://hexdocs.pm/mix/1.12/Mix.Tasks.Release.html),
run `nix build` (after updating dependencies as outlined in the below sections).
You can test the release is functional by running:
```bash
$ export DATABASE_URL=ecto://<username>:<password>@<host>/<db_name>
$ export SECRET_KEY_BASE=$(mix phx.gen.secret)
$ result/bin/boardwise start
```

### Backend

Mix dependencies are packaged using [mix2nix](https://github.com/ydlr/mix2nix).
After updating your `mix.lock` file, make sure to re-run the following:
```bash
$ mix2nix > deps.nix
```
As of now, `mix2nix` cannot handle git dependencies found inside the `mix.lock`
file. If you have git dependencies, add them manually or use
[FODs](https://nixos.org/manual/nixpkgs/stable/#packaging-beam-applications).

### Frontend

Frontend dependencies (i.e. assets found in the `/assets` folder) are packaged
using [node2nix](https://github.com/svanderburg/node2nix). You can generate the
relevant nix files for import using the following sequence of commands:
```bash
$ cd assets
$ rm -r node_modules
$ node2nix -l
```
In the above, we must remove `node_modules` (if it exists). Otherwise the
node packages will be included in the Nix build, influencing the outcome of
`node2nix`. The above generates three files:

* `node-packages.nix`
  * Captures the packages that can be deployed (including all its required
    dependencies)
* `node-env.nix`
  * Contains build logic
* `default.nix`
  * A composition expression allowing users to deploy the package. For an
    example of this deployment, refer to `flake.nix`

NOTE: Do not update the lock version used in `assets`. `node2nix` currently only
supports lock versions 1 and 2.

## Development

It's strongly advised to use `nix develop` when performing local development.
Doing so automatically includes the following features:

### Language Server

The [elixir-ls](https://github.com/elixir-lsp/elixir-ls) LSP (version 0.17.10)
and [typescript-language-server](https://github.com/typescript-language-server/typescript-language-server)
(version 4.1.2) is included in this flake.

### Formatting

Formatting depends on [prettier](https://prettier.io/) (version 3.1.0) and the
`mix format` task. A `pre-commit` hook is included in `.githooks` that can be
used to format all `*.exs?`, `*.jsx?`, and `*.tsx?` files prior to commit.
Install via:
```bash
$ git config --local core.hooksPath .githooks/
```
If running [direnv](https://direnv.net/), this hook is installed automatically
when entering the directory.
