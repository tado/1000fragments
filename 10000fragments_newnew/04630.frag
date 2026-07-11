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
    float zx = abs(fract(p.x * 3.77 + t * 1.05) - 0.5) * 2.0;
    v = sin((p.y * 3.29 + zx * 1.20 + t * 1.88) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 25.12 - t * 3.47 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 12.75 - t * 2.88 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.77 + ph), vnoise2(p * 4.77 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.77 + 2.06 * wq + vec2(1.7, 9.2) + t * 1.07),
                   vnoise2(p * 4.77 + 1.17 * wq + vec2(8.3, 2.8) - t * 0.82));
    v = vnoise2(p * 4.77 + 2.67 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * -2.93 + time * 0.94) * q1;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.83));
	for(int fo = 0; fo < 5; fo++){ q3 = abs(q3) - 0.49; q3 = rot2(0.44) * q3; }
	q3 = rot2(time * 0.61) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.54);
	float d3 = fieldC(q3, time, 1.12);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.90 + time * 0.08, vec3(0.49, 0.47, 0.44), vec3(0.46, 0.40, 0.30), vec3(0.99, 1.15, 0.85), vec3(0.92, 0.57, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
