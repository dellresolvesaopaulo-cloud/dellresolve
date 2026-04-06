export async function GET(req){

  const { searchParams } = new URL(req.url)

  const tag = searchParams.get("tag")

  if(!tag){
    return Response.json({erro:"Service Tag não informada"})
  }

  try{

    const res = await fetch(
      `https://www.dell.com/support/api/assetinfo/v4/getassetwarranty/${tag}`,
      {
        headers:{
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept":"application/json"
        }
      }
    )

    const text = await res.text()

    const data = JSON.parse(text)

    const produto =
      data.AssetWarrantyResponse?.assetEntitlementData?.[0]

    const modelo = produto?.productLineDescription || ""

    const garantiaRaw = produto?.endDate || ""

    const garantia = garantiaRaw
      ? new Date(garantiaRaw).toLocaleDateString("pt-BR")
      : ""

    return Response.json({
      service_tag:tag,
      modelo,
      garantia
    })

  }catch(e){

    return Response.json({
      erro:"Erro ao consultar Dell",
      detalhe:e.message
    })

  }

}
