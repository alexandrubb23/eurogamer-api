import * as cheerio from 'cheerio';

import { NotAcceptableException } from '@nestjs/common';
import { FeedEntry } from 'src/common/domains/entities/feed-entry.entity';
import { getSlugFromUrl } from 'src/common/utils/slug.utils';

const selectors = {
  titleSelector: 'h1.title',
  descriptionSelector: '.article_body_content',
  linkSelector: 'link[rel=canonical]',
  thumbnailSelector: 'img.headline_image',
  publishAtSelector: '.published_at',
  publishDateSelector: '.updated_at',
};

export default class FeedEntryParserService {
  public parse(html: string): FeedEntry {
    const {
      descriptionSelector,
      linkSelector,
      publishAtSelector,
      publishDateSelector,
      thumbnailSelector,
      titleSelector,
    } = selectors;

    const $ = cheerio.load(html);

    const title = $(titleSelector).text().replace(/\n/g, '').trim();
    if (!title) throw new NotAcceptableException('Title not found');

    const description = $(descriptionSelector)
      .find('p')
      .each(function () {
        $(this).html();
      })
      .toString();

    if (!description) throw new NotAcceptableException('Description not found');

    const link = $(linkSelector).attr('href');
    if (!link) throw new NotAcceptableException('Link not found');

    const thumbnail = $(thumbnailSelector).attr('src');
    const publishAt = $(publishAtSelector).text();
    const publishDate = (publishAt ? publishAt : $(publishDateSelector).text())
      .replace(/\n/g, '')
      .trim();

    return {
      description, // TODO: Use DOMPurify to sanitize the HTML content extracted from external sources to prevent XSS attacks.
      publishDate,
      thumbnail,
      title,
      slug: getSlugFromUrl(link),
    } as FeedEntry;
  }
}
