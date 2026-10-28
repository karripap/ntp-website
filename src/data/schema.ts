import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "@/consts.ts";
import {
  PORTFOLIO_ASSETS,
  PORTFOLIO_LOCATIONS,
  type PortfolioAsset,
} from "@/data/portfolio.ts";

/** Absolute URL on the canonical origin. */
const url = (path = "/") => new URL(path, SITE_URL).href;

/** Stable entity IDs, so schema blocks can reference one another. */
export const SCHEMA_IDS = {
  organization: url("/#organization"),
  website: url("/#website"),
  webpage: url("/#webpage"),
  portfolio: url("/#portfolio"),
  asset: (id: string) => url(`/#asset-${id}`),
};

/** Company details, kept in step with the footer. */
const LEGAL_NAME = "NTP Consulting OOD";
const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "5 Oborishte Street",
  addressLocality: "Sofia",
  addressCountry: "BG",
};

/** Organization and WebSite: the same on every page. */
export const siteSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": SCHEMA_IDS.organization,
      name: SITE_NAME,
      legalName: LEGAL_NAME,
      url: url(),
      description: SITE_DESCRIPTION,
      email: CONTACT_EMAIL,
      address: ADDRESS,
      logo: {
        "@type": "ImageObject",
        "@id": url("/#logo"),
        url: url("/logo.png"),
        width: 600,
        height: 600,
        caption: SITE_NAME,
      },
      image: { "@id": url("/#logo") },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Investor enquiries",
        email: CONTACT_EMAIL,
        availableLanguage: ["en"],
      },
      knowsAbout: ["Battery energy storage", "Grid-scale energy storage"],
    },
    {
      "@type": "WebSite",
      "@id": SCHEMA_IDS.website,
      url: url(),
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: SITE_LOCALE,
      publisher: { "@id": SCHEMA_IDS.organization },
    },
  ],
});

const locationLabel = (asset: PortfolioAsset) =>
  PORTFOLIO_LOCATIONS.find((location) => location.id === asset.location)
    ?.label ?? asset.name;

/** One battery asset, as a place with its key figures. */
const assetSchema = (asset: PortfolioAsset) => ({
  "@type": "Place",
  "@id": SCHEMA_IDS.asset(asset.id),
  name: `${asset.name} battery energy storage`,
  description: `${asset.description} ${asset.region}.`,
  address: {
    "@type": "PostalAddress",
    addressLocality: locationLabel(asset),
    addressCountry: "BG",
  },
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Rated power",
      value: asset.power,
      unitText: "MW",
      unitCode: "MAW",
    },
    {
      "@type": "PropertyValue",
      name: "Storage capacity",
      value: asset.capacity,
      unitText: "MWh",
      unitCode: "MWH",
    },
    { "@type": "PropertyValue", name: "Status", value: asset.status },
    {
      "@type": "PropertyValue",
      name: "Power conversion equipment",
      value: asset.equipment,
    },
  ],
});

/** The homepage and the portfolio it describes. */
export const homeSchema = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const power = PORTFOLIO_ASSETS.reduce((sum, asset) => sum + asset.power, 0);
  const capacity = PORTFOLIO_ASSETS.reduce(
    (sum, asset) => sum + asset.capacity,
    0,
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": SCHEMA_IDS.webpage,
        url: url(),
        name: title,
        description,
        inLanguage: SITE_LOCALE,
        isPartOf: { "@id": SCHEMA_IDS.website },
        about: { "@id": SCHEMA_IDS.organization },
        mainEntity: { "@id": SCHEMA_IDS.portfolio },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: url("/og-image.jpg"),
          width: 1200,
          height: 630,
        },
        dateModified: new Date().toISOString().slice(0, 10),
      },
      {
        "@type": "ItemList",
        "@id": SCHEMA_IDS.portfolio,
        name: `${SITE_NAME} battery storage portfolio`,
        description: `${PORTFOLIO_ASSETS.length} grid-connected battery storage sites in Bulgaria with ${power} MW of combined power and ${capacity} MWh of storage capacity.`,
        numberOfItems: PORTFOLIO_ASSETS.length,
        itemListElement: PORTFOLIO_ASSETS.map((asset, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: assetSchema(asset),
        })),
      },
    ],
  };
};
