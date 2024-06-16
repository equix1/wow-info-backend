## WoW Info Backend

Will fetch data from both the [Blizzard API](https://develop.battle.net/documentation/world-of-warcraft), [Raider.IO API](https://raider.io/api) and the [WarcraftLogs API](https://www.warcraftlogs.com/api/docs). It will transform the data and then add it to a PostgreSQL database using PrismaORM. The frontend interacts with this backend through routes made with Express.js.

# Architecture

## High Level Diagram
![High Level Architecture](https://github.com/equix1/wow-info-backend/blob/master/assets/diagrams-high-level-architecture.png)

## Entities Relationship Diagram
![Entities Relatinoship](https://github.com/equix1/wow-info-backend/blob/master/assets/diagrams-entities-relationship.png)
