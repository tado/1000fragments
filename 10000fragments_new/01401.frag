uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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
    vec2 wq = vec2(vnoise2(p * 1.71 + ph), vnoise2(p * 1.71 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.71 + 3.29 * wq + vec2(1.7, 9.2) + t * 0.57),
                   vnoise2(p * 1.71 + 1.92 * wq + vec2(8.3, 2.8) - t * 0.54));
    v = vnoise2(p * 1.71 + 3.94 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.30 * cos(sa * 3.0 + t * 1.16 + ph);
    v = sin((sr - petal) * 11.51);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 2.95, length(p) * 5.55 - time * 0.42); }
	p = rot2(0.65) * p;
	p.x += sin(p.y * 6.24 + time * 1.63) * 0.15;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.42);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.02 + time * 0.07, vec3(0.43, 0.41, 0.42), vec3(0.45, 0.39, 0.44), vec3(0.96, 1.08, 1.30), vec3(0.10, 0.20, 0.63));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
