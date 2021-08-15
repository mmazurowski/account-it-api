# Introduction

Application is using RabbitMQ as message broker and for processing Queues.

## Developing

Rabbit MQ exposes admin panel by default on `http://localhost:15672`. Port can be changed by altering value of **MESSAGE_BROKER_ADMIN_PORT** environment value.

## Enabling plugins

You can enable plugins by adding them to the configuration file

## RabbitMQ - Admin

Requirements:

1. RabbitMQ management plugin must be enabled

For local development you can login to admin panel (by default: http://localhost:15672) using following credentials:

```
login: guest
pass: guest
```

If you can't please refer to RabbitMQ configuration file to check if you have configured an instance properly `loopback_users.guest = none`.
