var amqp = require("amqplib/callback_api");
const sendEmail = require("../email/email");

function rabbitMQConnect() {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }

    //welcome email
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = "welcome_queue";

      channel.assertExchange(exchange, "fanout", {
        durable: true,
      });

      channel.assertQueue(
        "",
        {
          exclusive: true,
        },
        function (error2, q) {
          if (error2) {
            throw error2;
          }
          console.log(
            " [*] Waiting for messages in %s. To exit press CTRL+C",
            q.queue
          );
          channel.bindQueue(q.queue, exchange, "");

          channel.consume(
            q.queue,
            function (msg) {
              if (msg.content) {
                let data = JSON.parse(msg.content.toString());
                email = data.email;
                fullname = data.full_name;

                //Send Email

                // const email = "recipient@example.com";
                const subject = "Welcome To B2M";
                const template = "welcome";
                const context = { fullname };
                // const attachments = [
                //   {
                //     filename: "welcome.pdf",
                //     path: "./path/to/welcome.pdf",
                //     contentType: "application/pdf",
                //   },
                // ];
                sendEmail(email, subject, template, context)
                  .then(() => console.log("Email sent successfully!"))
                  .catch((error) =>
                    console.error("Error sending email:", error)
                  );
              }
            },
            {
              noAck: true,
            }
          );
        }
      );
    });

    //Order Confirmation
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = "ticket_queue";

      channel.assertExchange(exchange, "fanout", {
        durable: true,
      });

      channel.assertQueue(
        "",
        {
          exclusive: true,
        },
        function (error2, q) {
          if (error2) {
            throw error2;
          }
          console.log(
            " [*] Waiting for messages in %s. To exit press CTRL+C",
            q.queue
          );
          channel.bindQueue(q.queue, exchange, "");

          channel.consume(
            q.queue,
            function (msg) {
              if (msg.content) {
                let data = JSON.parse(msg.content.toString());
                email = data.email;
                fullname = data.full_name;
                ticketurl = data.ticket_pdf_url;

                //Send Email

                // const email = "recipient@example.com";
                const subject = "Ticket Order Confirmation";
                const template = "ticket";
                const context = {
                  fullname,
                  ticketUrl: "http://localhost:8000/tickets/" + ticketurl,
                };

                sendEmail(email, subject, template, context)
                  .then(() => console.log("Email sent successfully!"))
                  .catch((error) =>
                    console.error("Error sending email:", error)
                  );
              }
            },
            {
              noAck: true,
            }
          );
        }
      );
    });
  });
}

module.exports = rabbitMQConnect;
