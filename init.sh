#!/bin/bash
pnpm start:container
pnpm wait-for-port
pnpm deploy-gobi:contracts
pnpm heisenberg
pnpm db:push
pnpm generate-exports
pnpm i