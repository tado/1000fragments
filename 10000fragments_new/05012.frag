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

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.32 + t * 3.30 + ph) + sin(p.y * 3.23 - t * 1.09 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.62 + ph), vnoise2(p * 1.62 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.62 + 3.40 * wq + vec2(1.7, 9.2) + t * 0.36),
                   vnoise2(p * 1.62 + 3.24 * wq + vec2(8.3, 2.8) - t * 0.65));
    v = vnoise2(p * 1.62 + 2.85 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q1 *= 1.35;
	q2.y += sin(q2.x * 2.94 + time * 3.38) * 0.12;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.95);
	float d = d1 * d2;
	vec3 col = palette(d * 1.46 + time * 0.14, vec3(0.45, 0.58, 0.57), vec3(0.41, 0.31, 0.35), vec3(1.03, 1.07, 1.36), vec3(0.87, 0.68, 0.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
