import { Client } from "@elastic/elasticsearch";
import config from "@config/index";

const elasticClient = new Client({
  node: config.elasticsearchURL,
});

export default elasticClient;
