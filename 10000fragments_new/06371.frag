uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.89 + ph), vnoise2(p * 1.89 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.89 + 1.66 * wq + vec2(1.7, 9.2) + t * 0.52),
                   vnoise2(p * 1.89 + 2.18 * wq + vec2(8.3, 2.8) - t * 0.58));
    v = vnoise2(p * 1.89 + 2.91 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.27 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.20 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.84) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	p = fract(p * 1.64) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.64, lr * 1.41 + time * 0.32); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.42);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.32 + time * 0.03, vec3(0.42, 0.46, 0.44), vec3(0.50, 0.48, 0.44), vec3(1.23, 1.35, 0.79), vec3(0.24, 0.57, 0.45));
	col *= 0.81 + 0.14 * sin(gl_FragCoord.y * 1.98 + time * 17.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
