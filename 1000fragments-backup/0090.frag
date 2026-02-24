uniform float time;
uniform vec2 resolution;
out vec4 fragColor;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.0;a*=0.5;}return v;}
void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float f = fbm(uv * 2.0 + time * 0.1);
    float d = 0.0;
    for(float i = 0.0; i < 5.0; i++) {
        vec2 c = vec2(sin(time*0.3+i*1.2)*0.6, cos(time*0.4+i*0.9)*0.6);
        d += 0.05 / (length(uv + vec2(f-0.5)*0.5 - c) + 0.02);
    }
    float v = d + f * 0.3;
    fragColor = TDOutputSwizzle(vec4(v*0.8, v*0.4, v*1.5, 1.0));
}
