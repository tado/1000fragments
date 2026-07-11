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
    vec2 tp = p * 6.16; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 12.46 - t * 2.93 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.14 + ph), vnoise2(p * 2.14 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.14 + 2.18 * wq + vec2(1.7, 9.2) + t * 1.10),
                   vnoise2(p * 2.14 + 1.03 * wq + vec2(8.3, 2.8) - t * 1.20));
    v = vnoise2(p * 2.14 + 3.89 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.85;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 3.20;
	q1 = rot2(time * -0.65) * q1;
	q2 = fract(q2 * 2.57) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.65);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.71 + time * 0.30, vec3(0.46, 0.47, 0.59), vec3(0.48, 0.45, 0.46), vec3(1.30, 0.75, 1.36), vec3(0.46, 0.46, 0.57));
	col = fract(col * 2.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
