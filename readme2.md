Merhaba arkadaşlar nodejs için yapmaya çalıştığım bir Rest api kütüphanesini tanıtmak istiyorum. Test suitini birdigimde buraya npm linkini eklerim

# Neptune Nedir?

Basitce Neptune object-driven rest api frameworku dur.

## Peki neden Neptune

Neptune giris kaynagim express ve express kullanirkan karsilastigim bazi sorunlar. Bu sorunlar uzerinden gelistirdigim [Microp](https://www.npmjs.com/package/microp) ve micropun yeterince maintain edilebilir olmamasi. Ufak bir yenilik eklemek icin micropu bir kac kez bastan sona tekrar yazdim. Neptune icin ise Micropun evriminin son hali diyebilirim.

### Peki nedir bu sorunlar?

- Expess cok falza 3.parti pakete ihtiyac duyor. Buda node_modules un asiri sismesine, uygulamanin hantal olmasina, hatta ayaga kalkarken cok uyusuk olmasina sebep oluyo. Bu sebeptern oturu yarn vs paket yoneticileri pnp cozumleri ile beraber geliyor ancak node ekosisteminde her paket pnp icin uygun degil.

<p align="left">
  <img src="https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fcf8075dc-9d40-4d54-8762-b8643a4be8a8_1193x790.png" width="350" alt="evrendeki en agir nesneler">
 
</p>

- Request bodysi okumayan bir api gordunuz mu? Bir rest api, request bodysini, queryStringleri, vs parse edebilmek icin ekstra bir pakete ihtiyac duymamali. bir apiden bunu yapmasani bekleriz. Evet express bu kadar generic bir task icin bile 3.parti paketlere ihtiyac duyoyor. Ister netlify da deplay edin, ister node uzerinde Neptune her turlu request boundrysini parse edebilir.

- Expressi serverless platformlarda deploy edemezsiniz. Buna karsin Neptune platform agnostictir.

- yil 2022 Express halen promise desteklemiyor. Ister generator dondurun ister promise neptun hepsini kendi basina handle edebilir.
- Neptune expressin (Model view controller router) yapisi yerine Resource,Service ve Provider kullanir.
- Neptune XSRF, CSRF gibi bilindik tehtitler icin ekstra pakete ihtiyac duymaz, Zamanla guvenlik suitini gelistirmeye devam edecez.

---

- Neptunun tek eskisine gelecek olursak, NodeAdaptoru node 18~ e ihtiyac duyuyor

# Neptuneun kullanimi

## Neptune app

Bos bir neptune uygulamasi olusturmak bu kadar kolay

```ts
import { createNeptune } from "@.../neptune/app";

export const app = createNeptune({
  adapter: NeptuneNodeAdapter,
  hostname: "localhost",
  port: 3000,
  resources: [],
}).run();
```

## Neptune resource

Her neptune resource uygulamamizin bir route'unu temsil ediyor

Bir users resource umuz var diyelim. /users e dusen her istek bu resource da karsilaniyor.

Resource basitce bir class NeptunResource abstract classini extend ediyor.

```ts
// userResource.ts
import { NeptunResource } from "@.../common";

export class UsersResource extends NeptuneResource {
  // bu bir array de olabilir ["/users" , "/user"]
  // bu durumda hem /users e hemde /user e atilan istek burada karsilanir
  public path = "/users";

  GET() {
    const users = ["jdoe", "mdoe", "bdoe"]; // dummy users
    return Response.json(users, 200, { "Content-Type": "application/json" });
  }
}
```

```ts
import { NeptuneNodeAdapter } from "@.../neptune/adapter";
import { createNeptune } from "@.../neptune/app";
import { UserResource } from "./path/to/userResource";
export const app = createNeptune({
  adapter: NeptuneNodeAdapter,
  hostname: "localhost",
  port: 3000,
  resources: [UserResource],
}).run();
```

Gordugunuz gibi expressin her isi yapan bir routeri yerine bir isi cok iyi yapan bir resource ve her resource butun http methodlarini handle edebilir ( get, post, put, patch, delete, head, options, connect, trace). Bu sayede dahada moduler bir yapiya kavusmus oluyoruz.

## Body parsing

Neptune body parse edebilmek icin 3.parti paketlere ihtiyac durmaz. Her turlu boundaryi parse edebilir

```ts
//upload.ts
import { NeptunResource } from "@.../common";
import type { NeptuneFormData, NeptuneFile } from "@.../internal";

export class UploadResource extends NeptuneResource {
  public path = "/user/upload";

  // body parse etmek asenkron bir islem oldugundan async await kullanacam

  async POST(request: NeptuneRequest) {
    const data: NeptuneFormData = await request.formData();

    const profilePhoto: NeptuneFile = data.get("profile-photo");
    //content type'i text/... haricinde olan hersey icin bize aslinda Reqdable stream olarak donuyor

    try {
      await createWriteStream("kaydedilecek/konum/resim.png").pipe(
        profilePhoto
      );
      return Response.null(200);
    } catch {
      return Response.null(400);
    }
  }
}
```

NeptuneRequest objesinin body parsing icin sahip oldugu methodlar Text(), Json(), Blob(), FormData(), Buffer(), Xml(), Query()

## Sending Response Body

Neptune kendi icinde her turlu datayi serialize edebilir

```ts
import { NeptunResource } from "@.../common";
import { createReadStream } from "fs";

class DownloadResource extends NeptuneResource {
  public path = ["/download", "icon.ico"];

  async GET(request: NeptuneRequest) {
    if (request.path !== "icon.ico") {
      // Dosya stream olarak gonderildi.
      return createReadStream("gonderilecek/dosya.png").pipe(
        Response.head({
          "Content-Type": "img/png",
          "Content-Disposition": 'attachment; inline; filename="filename.jpg"',
        })
      );
    }

    // NeptuneResponse .File() methodunada sahip ancak bu buyuk dosyaladarda memory sorunlarina neden olabilir
    return await Response.File("icon.ico", 200, {
      "Content-Type": "img/png",
      "Content-Disposition": 'attachment; inline; filename="filename.jpg"',
    });
  }
}
```

## Request parametresi almak

neptune /foo/bar , /foo/:bar , /\\/foo\\/[a-z]+/, /foo/[a-z] seklindeki parametrelerin tumunu destekler

```ts
export class UserResource extends NeptuneResource {
  public path = "/user/:id";

  GET() {
    const users = ["jdoe", "mdoe", "bdoe"]; // dummy users

    // this.param("id") => "1"
    // this.params() => {id: "1"}
    return Response.Text(users[this.param("id") as number]);
  }
}
```

/user/1 e Get istegi atildigini varsayalim

aldigimiz cevap "jdoe" olacaktir

## Error handling

Neptune error handling icin cesitli imkanlar sunar. Bunlardan biri NeptuneError yardimci classi

```ts
//userNotFoundError.ts
import { NeptuneError } from from "@.../common";

export class UserNotFoundError extends NeptuneError {
    message = "User not found";
    status = 404
}
```

```ts
import { NeptuneResource } from from "@.../common";
import type { INeptuneError } from from "@.../common";
import { UserNotFoundError } from "../path/to/userNotFoundError"
export class UserResource extends NeptuneResource {
  public path = "/user/:id";

  GET() {
    const users = ["jdoe", "mdoe", "bdoe"]; // dummy users


    if(!users[this.param("id")]) throw new UserNotFoundError()

    return Response.Text(users[this.param("id") as number]);
  }


  /*
    Resource icinde her hangi bir error firlatilirsa bu endpointe duser
    Burada gonderilecek responsa dair herseyi override edebilirsiniz
    Bu eger NeptuneError dan turetilmis bir class firlatildi ise bu endpoint zorunlu degildir ve tanimlanmadigi taktirde otomatik olarak Error sinifi donecektir
    {
        status: 404,
        body: {
            message: "User not found"
        }
    }

  */
    ERROR(error: INeptuneError ) {

        if(error instanceof UserNotFoundError) {
                return  this.setHeader("x-user", "not found")
        }

        else return Response.null(500)
    }
}
```

/user/1 e istek atildigini varsayalim

gelecek response su sekilde olacak

```json
{
  "status": 200,
  "body": "mdoe",
  "headers": {...}
}
```

eger /user/4 e istek atmis olsaydik

```json
{
    "status": 404,
    "body" : { "message" : "User not found"},
    "headers": {
        ...,
        "x-user": "not found"
    }
}
```

## Gelecek veri tipini zorunlu tutma

Bunun icin NeptuneInput yardimci class indan turetilmis bir interface yada class kullanmak yeterli yeterli

```ts
    import { NeptuneInput } from from "@.../common";
    // sadece typescript
    export interface ILoginInput extends NeptuneInput {
        password: string;
        username: string;
    }

    // yada

    export class LoginInput extends NeptuneInput {
        password: string;
        username: string;
    }
```

### Generic kullanmak **sadece Typescript**

```ts
import { NeptuneResource } from from "@.../common";
import { ILoginInput } from "../path/to/loginInput";
export class LoginResource extends NeptuneResource {
  public path = "/login";

  async POST(request) {

    const { password, username } = await requset.json<IUserInput>()
    // eger istenilen input gelirse sorunsuz bir sekilde ilerleyecek
    // gelmezse ise InputIsNotValid { error : InputNotValidError, message: "<T> InputNotValid"} hatasi firlatilacak, ERROR handlerinda karsilayabilirsiniz


    return Response.Text("Wellcome user");
  }

}
```

### Declarative yontem

```ts
import { NeptuneResource } from from "@.../common";
import { ILoginInput } from "../path/to/loginInput";
export class LoginResource extends NeptuneResource {
  public path = "/login";

  // POST methoduna gelen body inputa uygun olmazsa ayni process buradada isleyecek
  input = {
    POST: ILoginInput
  }

  async POST(request) {

    const { password, username } = await requset.json()



    return Response.Text("Wellcome user");
  }

}
```

# Servisler

Servisleri Express middleware leri gibi dusune bilirsiniz. Ancak dahada fazlasi var

Servislerde basitce bir class NeptuneService abstract classindan turetiliyor

```ts

//authService.ts
import { NeptuneService } from from "@.../common";


class AuthService extends NeptuneService {

    runBeforeResource(request) {

        const token = this.cookies("token")

        if(!token) throw new IsNotAuthError() // dummy authError classi

        const verify = jwt.verify(token) // dummy jwt :D

        if(!token) throw new TokenIsNotValidError() // dummy tokenNotValidError classi


        // Keyleri string tipinde olan her hangi bir obje donebilirsiniz buna daha sonra gelecez
        return {
            session: verify
        }
    }


    // eger ERROR methodu service icinde tanimlandiysa mutlaka response donmelidir.
    // tanimlanmadi ise Resource daki error methodu calisacaktir. eger o da yoksada error classina gore response donecektir
    ERROR (error) {
        Response.null(401)
    }
}
```

Soyle bir seneryomuz olsun, kullanici addressini degistirmek istiyor diyelim. Bu resourca gelmeden once giris yapip yapmadigini kontrol ediyoruz. Eger giris yapti ise buradaki pathc methodu calissin yoksa 401 gonderip istegi sonlandirsin

```ts
//...imports

export class AddressResource extends NeptuneResource {
  public path = "/user/address";

  // bu resourca HER PATHC istegi geldiginde pathc dizinindeki her servis sirasi ile calisacak
  services: {
    PATHC: [AuthService] // service ler bir biri ardina chain edilebilir
  }

  async PATCH(request) {

    const address = await requset.<IAddressInput>json()

    // servislerin dondugu her objeye this.locals den ulasabiliriz. servislerin dondugu her locals objesi bir birine merge edilir. ayrica locals objesi servislerde de ulasilabilirdir. bir servisin dondugu locals objesine diger servisten ulasilabilir
    const user = this.locals.session;  // Service den tanidik geldi mi?

    // providerlera servislerden sonra gelecez
    const newAddress = await  (this.providers.getProvider("UserProvider")).getUser(user).setAddress(address)

    return Response.json(newAddress)
  }

}
```

# Providers

Provider lari viewModel gibi dusunebilirsiniz.
Providerlar NeptuneProvider abstract classindan turetiliyor. Providerlar Transient, singleton ve scoped olarak calisabilirler ve Neptune de di containerlarinin temelini olusturur

```ts
// userProvider.ts
import { NeptuneProvider } from "@.../ioc";

export class UserProvider extends NeptuneProvider {
  scope = "transient"; // "transient" , "singleton" , "scoped"
  name = "UserProvider"; // providerlara ulasmak icin gerekli
  findUserById(id) {
    // fake UserModel
    return UserModel.findById(id);
  }
}
```

```ts
//...imports

export const app = createNeptune({
  adapter: NeptuneNodeAdapter,
  hostname: "localhost",
  port: 3000,
  resources: [UserResource],
  providers: [UserProvider], // providerimizi ekledik
}).run();
```

providerlara herhangi bir resource, service veya baska bir providerdan erisilebilir

```ts
//...imports

export class UserResource extends NeptuneResource {
  public path = "/user/:id";

  async GET(request) {
    // providerlera servislerden sonra gelecez
    // Providerlara ulasmak asenkrondur, sadece cagirildiklarinda inject edilir ve sonrasinda dispose edilir
    const userProvider = await this.providers.getProvider("UserProvider");

    return Response.json<Partial<User>>(
      userProvider.findUserById(this.param("id"))
    );
  }
}
```
