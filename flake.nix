{
  description = "Client site dev environment";

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
          # Bun only, no Node: `bun --bun run` runs Astro on Bun's runtime.
          # If an integration ever needs real Node, add pkgs.nodejs_22 here.
          packages = [ pkgs.bun ];
        };
      });
    };
}
