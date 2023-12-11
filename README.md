# Eurogamer Feed Aggregator API

## Overview

This project is a backend service designed to scrape news and video feeds from Eurogamer, store the content in a database, and provide API access to the aggregated data. The service periodically updates the database to reflect the latest content available on the Eurogamer website.

## Features

- Scrapes Eurogamer news and video feeds every 10 minutes (or defined by the user).
- Aggregates and stores the following information in a database:
  - Title
  - Description
  - Thumbnail
  - Link
  - Publish Date
- Creates local backups of feed content at each run. (TODO: To be implemented)
- Logs exceptions for debugging and monitoring.
- API endpoints to access current news and video content.
- Automatically adds new or update items and removes items no longer present on Eurogamer.

## Technologies Used

- [Node.js](https://nodejs.org/en)
- Database: [MySQL](https://www.mysql.com/)
- Libraries: [Cheerio](https://cheerio.js.org/), [Axios](https://axios-http.com/docs/intro), [TypeORM](https://typeorm.io/), [NestJS](https://nestjs.com/), and more.

## Getting Started

### Prerequisites

- [Doker](https://www.docker.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/alexandrubb23/eurogamer-api.git
```

2. Navigate to the project directory:

```bash
cd eurogamer-api
```

4. Run the startup script

```bash
./start.sh
```

5. Stop Docker container

```bash
docker compose down
```

## API Endpoints

For more details please visit the [Swagger Documentation](http://localhost:9000/api):

- GET **/v1/news**: Fetches the latest news.
- GET **/v1/videos**: Fetches the latest video content.

## Testing

TODO: To be implemented
