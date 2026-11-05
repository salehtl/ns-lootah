{
  description = "nslootah.com dev environment";

  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-26.05";

  outputs =
    { nixpkgs, ... }:
    let
      forSystems =
        f:
        nixpkgs.lib.genAttrs [ "x86_64-linux" "aarch64-darwin" ] (
          system: f nixpkgs.legacyPackages.${system}
        );
    in
    {
      devShells = forSystems (pkgs: {
        default = pkgs.mkShell {
          packages = [
            pkgs.bun
            # `bun run` starts Astro's CLI under its `node` shebang.
            pkgs.nodejs_22
          ];
        };
      });
    };
}
