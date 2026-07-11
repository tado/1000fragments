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
    vec2 wq = vec2(vnoise2(p * 3.79 + ph), vnoise2(p * 3.79 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.79 + 2.37 * wq + vec2(1.7, 9.2) + t * 0.55),
                   vnoise2(p * 3.79 + 1.42 * wq + vec2(8.3, 2.8) - t * 0.76));
    v = vnoise2(p * 3.79 + 3.00 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.87; }
	p = rot2(p.y * -3.96 + time * 0.26) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.15 + time * 0.16, vec3(0.56, 0.51, 0.58), vec3(0.37, 0.50, 0.35), vec3(0.93, 0.94, 0.84), vec3(0.19, 0.48, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
