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
    vec2 wq = vec2(vnoise2(p * 4.52 + ph), vnoise2(p * 4.52 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.52 + 1.97 * wq + vec2(1.7, 9.2) + t * 0.42),
                   vnoise2(p * 4.52 + 2.20 * wq + vec2(8.3, 2.8) - t * 1.13));
    v = vnoise2(p * 4.52 + 3.90 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.51 + 0.28 * cos(sa * 4.0 + t * 2.18 + ph);
    v = sin((sr - petal) * 8.46);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	q1 = rot2(length(q1) * -3.98 + time * 0.74) * q1;
	q2 = abs(q2);
	q2 += vec2(-0.21, -0.37) * sin(length(q2) * 2.28 - time * 0.99) * 0.25;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.56);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.49 + time * 0.35, vec3(0.48, 0.52, 0.58), vec3(0.39, 0.34, 0.43), vec3(1.39, 1.35, 1.29), vec3(0.55, 0.74, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
