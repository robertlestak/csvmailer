# csvmailer

A slim bulk mailing application.

## Build

docker build . -t csvmailer

## Basic Usage

Create a directory to contain the application data, then mount this directory into the container's `/data` directory.

Place your CSV email list and HTML newsletter file in this directory. When using the CLI, you only need to reference the file name (ex: `... -e newsletter.html`).

A `[campaign].log` file will be created detailing the send statistics. Unless manually deleted, campaign log files will remain to ensure full campaign continuity and prevent duplicate sends of a single campaign.

## CLI

docker run -v [volume]:/data --env-file [env-file] -it --rm csvmailer [options]

## Options

````
-V, --version            output the version number
   -c, --campaign [name]    Name of campaign [default]
   -e, --email [name]       Name of HTML email file [email.html]
   -f, --file [name]        Name of CSV emails file [emails.csv]
   -l, --log                View campaign log
   -m, --mail               Start mail process
   -s, --subject [subject]  Subject of email [Newsletter]
   -h, --help               output usage information
````
