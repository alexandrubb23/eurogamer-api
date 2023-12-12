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

## TODO - Things to be Implemented

1. Enhanced Exception Handling Using NestJS

Improve error handling by utilizing NestJS's built-in exception handling. This makes the code more concise and leverages NestJS's framework capabilities for cleaner error management.

### Current Implementation:

```
async getNewsBySlug(slug: string): Promise<News> {
  const news = await this.newsRepository.findOne({
    where: {
      slug,
    },
  });

  if (!news) throw new NotFoundException(`News with slug ${slug} not found`);

  return news;
```

### Proposed Improvement

```
  async getNewsBySlug(slug: string): Promise<News> {
    return this.newsRepository.findOneOrFail({
      where: {
        slug,
      },
    });
  }
```

In the improved version, **findOneOrFail** method is used, which automatically throws a NotFoundException if the item is not found, thereby reducing boilerplate code.

2. Enhanced Content Processing and Relationships

Develop a process to scrape each item's description, extract video IDs, sanitize the content, and establish a **OneToMany** relationship. This will enrich the data model with relevant media references.

### Proposed Data Structure:

```
{
  "uuid": "77dc65a2-b2c5-4608-abc6-fc245c887d7d",
  "slug": "this-new-mod-lets-you-play-cyberpunk-2077-in-vr",
  "title": "This new mod lets you play Cyberpunk 2077 in VR",
  "description": "Something goes here",
  "thumbnail": "https://assetsio.reedpopcdn.com/-1645789221489.jpg?width=690&quality=75&format=jpg&auto=webp",
  "publishDate": "Updated on 27 Feb 2022",
  "gallery": {
    "youtube": [
      "eV2O_3er-mo",
      "eV21_3er-mo"
    ],
    "freeTube": ["a", "b", "c"]
  }
}
```

This structured format will enable the API to provide more comprehensive content, including embedded media and other relevant resources.
