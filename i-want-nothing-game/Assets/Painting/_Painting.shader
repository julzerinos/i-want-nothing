Shader "CustomRenderTexture/Simple"
{
    Properties
    {
        _Color ("Color", Color) = (1,1,1,1)
        _Tex("InputTex", 2D) = "white" {}
    }

    SubShader
    {
        Lighting Off
        Blend One Zero

        Pass
        {
            HLSLPROGRAM
            #include "UnityCG.cginc"
            #include "UnityCustomRenderTexture.cginc"
            #pragma vertex CustomRenderTextureVertexShader
            #pragma fragment frag
            #pragma target 3.0

            float4 _Color;
            sampler2D _Tex;

            half2 _DrawPosition;

            float4 frag(v2f_customrendertexture IN) : COLOR
            {
                half distance = IN.localTexcoord - _DrawPosition;
                half stepped = 1 - smoothstep(1, 1, distance);
                return stepped;
            }
            ENDHLSL
        }
    }
}