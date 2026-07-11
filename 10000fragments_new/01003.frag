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
    vec2 wq = vec2(vnoise2(p * 1.73 + ph), vnoise2(p * 1.73 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.73 + 1.13 * wq + vec2(1.7, 9.2) + t * 0.38),
                   vnoise2(p * 1.73 + 2.05 * wq + vec2(8.3, 2.8) - t * 0.96));
    v = vnoise2(p * 1.73 + 3.58 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.68 + vec2(t * 2.08, -t * 0.76) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -3.64 + time * 0.81) * q1;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.14; q2 = rot2(0.34) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.55);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.74 + time * 0.36, vec3(0.56, 0.56, 0.54), vec3(0.45, 0.42, 0.48), vec3(0.85, 0.95, 1.10), vec3(0.42, 0.93, 0.75));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
