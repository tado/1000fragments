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
    vec2 wq = vec2(vnoise2(p * 4.86 + ph), vnoise2(p * 4.86 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.86 + 3.16 * wq + vec2(1.7, 9.2) + t * 0.49),
                   vnoise2(p * 4.86 + 3.08 * wq + vec2(8.3, 2.8) - t * 1.01));
    v = vnoise2(p * 4.86 + 3.69 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.33 + t * 5.70 + ph) + sin(p.y * 5.56 - t * 2.27 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(0.85) * q1;
	q1 = rot2(time * -1.24) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.20);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.92 + time * 0.01, vec3(0.59, 0.42, 0.50), vec3(0.37, 0.44, 0.40), vec3(1.25, 0.76, 1.09), vec3(0.89, 0.41, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
