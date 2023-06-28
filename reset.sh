#!/bin/bash
docker volume rm escrow_mysql-data
docker volume rm escrow_chain-data                                      
docker-compose down --remove-orphans
rm -rf ./packages/core/deployments/localhost
