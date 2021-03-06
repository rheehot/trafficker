import ProxyConfig from "./proxyConfig";
import newProxyServer from "./newProxyServer";
import useLogger from "../useLogger";

const logger = useLogger({ name: "startServer" });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function startProxyServer(config: ProxyConfig) {
  const { agentCount } = config;
  return Promise.all(
    Array(agentCount)
      .fill(0)
      .map(() =>
        newProxyServer({
          config,
        }).catch((error) =>
          logger.error({ config, error }, "Error in proxyServer")
        )
      )
  );
}
