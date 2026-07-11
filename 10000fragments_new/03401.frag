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
    vec2 wq = vec2(vnoise2(p * 4.04 + ph), vnoise2(p * 4.04 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.04 + 2.50 * wq + vec2(1.7, 9.2) + t * 1.20),
                   vnoise2(p * 4.04 + 1.80 * wq + vec2(8.3, 2.8) - t * 1.01));
    v = vnoise2(p * 4.04 + 2.08 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.23, t * 2.31 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += sin(p.y * 3.41 + time * 1.95) * 0.14;
	p = fract(p * 2.04) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.64);
	float d = d1 * d2;
	vec3 col = palette(d * 0.65 + time * 0.18, vec3(0.51, 0.53, 0.52), vec3(0.30, 0.33, 0.36), vec3(0.98, 1.24, 1.09), vec3(0.32, 0.31, 0.99));
	col = mod(col * 1.36, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
