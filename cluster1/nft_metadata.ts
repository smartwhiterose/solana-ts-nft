import wallet from "../cluster1/wallet/Turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
       
        const image = "https://arweave.net/4eWwfxREtWwBe2mVc32KrU9VAwJPxMsArmd37henrUvF";
    

       const metadata = {
        name: "smartwhiterose",
        symbol: "RuggyRose",
        description: "My NFT-Rose",
        image: image,
        attributes: [
          { trait_type: "rarity", value: "mythic" },
         
        ],
        properties: {
          files: [
            {
              type: "image/png",
              uri: image
            }
          ]
        },
        creators: [
        ]
      };
  
      const myUri = await umi.uploader.uploadJson(metadata);
      console.log("Your metadata URI: ", myUri);
    } catch (error) {
      console.log("Oops.. Something went wrong", error);
    }
  })();
