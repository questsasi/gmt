import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {
  const keycloakConfig = {
    url: 'http://localhost:8080' + '/auth',
    realm: 'master',
    clientId: 'gmt',
    'public-client': true
  };

  return () =>
    keycloak.init({
      config: keycloakConfig,
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      }
    });
}
