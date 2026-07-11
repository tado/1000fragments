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
    float wa = sin(p.x * 17.93 + t * 2.26 + ph) * 0.7;
    float wb = sin(p.y * 12.86 - t * 1.07 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.46;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.00 + ph), vnoise2(p * 4.00 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.00 + 3.45 * wq + vec2(1.7, 9.2) + t * 0.41),
                   vnoise2(p * 4.00 + 3.90 * wq + vec2(8.3, 2.8) - t * 0.33));
    v = vnoise2(p * 4.00 + 1.84 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.60, length(p) * 5.63 - time * 0.66); }
	p = rot2(length(p) * -3.19 + time * 1.49) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.51; p = rot2(1.39) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.59);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.66 + time * 0.01, vec3(0.45, 0.56, 0.42), vec3(0.45, 0.46, 0.37), vec3(1.01, 1.08, 1.10), vec3(0.62, 0.48, 0.30));
	col = fract(col * 1.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
