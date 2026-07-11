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

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.77);
    float gsh = hash21(vec2(grow, floor(t * 2.33))) - 0.5;
    float gx = p.x + gsh * 0.49;
    v = sin(gx * 17.35 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.95));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.84 + ph), vnoise2(p * 4.84 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.84 + 1.94 * wq + vec2(1.7, 9.2) + t * 0.44),
                   vnoise2(p * 4.84 + 1.84 * wq + vec2(8.3, 2.8) - t * 0.97));
    v = vnoise2(p * 4.84 + 2.68 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.70;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.62 * fr * fr; }
	q2 = rot2(q2.y * 2.22 + time * 1.01) * q2;
	q2 = (floor(q2 * 11.8) + 0.5) / 11.8;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.03);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.26 + time * 0.10, vec3(0.47, 0.47, 0.59), vec3(0.44, 0.30, 0.30), vec3(1.34, 0.85, 0.74), vec3(0.44, 0.56, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
