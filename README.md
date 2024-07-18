# Email Notification Service

notification service for the repository [e-ticketing backend](https://github.com/kevinkimutai/event-ticketing-backend)

## Description

Node JS application that sends messages to users of site using **Nodemailer** and **mailtrap**

## Technologies & Libraries Used

- [Node js](https://nodejs.org/en)-JS Backend
- [Nodemailer](https://www.nodemailer.com/about/)-node js email sending library
- [Mailtrap](https://mailtrap.io/home)-Mock mailbox for testing emails before production
- [RabbitMQ](https://www.rabbitmq.com/tutorials)-Async communication between services.

## Getting Started

- git clone `git clone https://github.com/kevinkimutai/ticketing_email_notification_service.git `
- Ensure you have .env at root with values from mailtrap:
  ```
  MAILTRAP_HOST
  MAILTRAP_PORT
  MAILTRAP_USERNAME
  MAILTRAP_PASSWORD
  ```
- E-ticketing backend running from [e-ticketing backend](https://github.com/kevinkimutai/event-ticketing-backend)

## Features

- send Welcome Messages to new users
- Send Ticket orders to attendees of events

## Screenshots

1.  Welcome Email
    ![welcome](https://firebasestorage.googleapis.com/v0/b/creadable-22c39.appspot.com/o/Screenshot%20from%202024-07-18%2015-33-25.png?alt=media&token=65495663-f16e-4f17-b9e1-5ab494cc19e0)

2.  Order-confirmation
    ![order-confirmation](https://firebasestorage.googleapis.com/v0/b/creadable-22c39.appspot.com/o/Screenshot%20from%202024-07-18%2017-03-29.png?alt=media&token=944ac673-5492-4d30-a4d1-af4fa1b208c2)
