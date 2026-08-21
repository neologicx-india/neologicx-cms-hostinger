import type { Schema, Struct } from '@strapi/strapi';

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String;
    robots: Schema.Attribute.Enumeration<
      [
        'index, follow',
        'noindex, follow',
        'index, nofollow',
        'noindex, nofollow',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'index, follow'>;
    structuredData: Schema.Attribute.JSON;
    twitterDescription: Schema.Attribute.Text;
    twitterImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    twitterTitle: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.seo': SharedSeo;
    }
  }
}
