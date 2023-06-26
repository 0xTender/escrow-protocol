#!/bin/bash
pnpm start:container
pnpm wait-for-port
pnpm deploy-local:contracts
pnpm heisenberg
pnpm db:push