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
    v = sin(p.x * 21.96 + sin(p.y * 4.94 + t * 0.90) * 4.03 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.27 + ph), vnoise2(p * 3.27 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.27 + 3.91 * wq + vec2(1.7, 9.2) + t * 0.95),
                   vnoise2(p * 3.27 + 1.44 * wq + vec2(8.3, 2.8) - t * 0.88));
    v = vnoise2(p * 3.27 + 3.91 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.25;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	q2 = rot2(time * 1.38) * q2;
	{ float fr = length(q2); q2 *= 1.0 + -0.67 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.40);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.99 + time * 0.21, vec3(0.48, 0.50, 0.58), vec3(0.49, 0.42, 0.36), vec3(1.37, 1.24, 1.08), vec3(0.35, 0.26, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
