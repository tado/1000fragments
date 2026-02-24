uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    float v = 0.0, sz;
    sz = 1.1000 + sin(time*19.0000+0.0000)*0.1000; v += step(-sz, uv.x)*step(-sz, uv.y)*step(uv.x, sz)*step(uv.y, sz);    sz = 1.0200 + sin(time*19.3000+0.5000)*0.1400; v += step(-sz, uv.x)*step(-sz, uv.y)*step(uv.x, sz)*step(uv.y, sz);    sz = 0.9400 + sin(time*19.6000+1.0000)*0.1800; v += step(-sz, uv.x)*step(-sz, uv.y)*step(uv.x, sz)*step(uv.y, sz);    sz = 0.8600 + sin(time*19.9000+1.5000)*0.2200; v += step(-sz, uv.x)*step(-sz, uv.y)*step(uv.x, sz)*step(uv.y, sz);    sz = 0.7800 + sin(time*20.2000+2.0000)*0.2600; v += step(-sz, uv.x)*step(-sz, uv.y)*step(uv.x, sz)*step(uv.y, sz);
    v = mod(v, 2.0) < 1.0 ? v : 2.0 - v;
    vec3 rgb = vec3(mod(v*0.4, 1.0)*2.5, mod(v*0.4, 1.0)*0.4, mod(v*0.4, 1.0)*3.0);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}