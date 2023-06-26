# Candy

Steps to run

Run if required:

```sh
docker volume create chain-data
```

Update the env:

```
cp .env.example .env
```

Initialize:

```
./init.sh
```

Start worker:

```
pnpm run start:worker
```

Start dev

```
pnpm run dev
```

You can reset your local deployments with (destructive action):

./reset.sh
