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
    vec2 wq = vec2(vnoise2(p * 4.16 + ph), vnoise2(p * 4.16 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.16 + 1.40 * wq + vec2(1.7, 9.2) + t * 0.38),
                   vnoise2(p * 4.16 + 1.78 * wq + vec2(8.3, 2.8) - t * 0.85));
    v = vnoise2(p * 4.16 + 3.82 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.16 * cos(sa * 8.0 + t * 1.67 + ph);
    v = sin((sr - petal) * 14.95);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 1.16) * q1;
	q2 = rot2(q2.y * -2.17 + time * 0.59) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.08);
	float d = d1 * d2;
	vec3 col = palette(d * 0.95 + time * 0.34, vec3(0.41, 0.51, 0.47), vec3(0.39, 0.45, 0.45), vec3(1.19, 1.39, 0.84), vec3(1.00, 0.19, 0.53));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
