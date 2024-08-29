'use strict';

/**
 * news-catcher service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-catcher.news-catcher');
