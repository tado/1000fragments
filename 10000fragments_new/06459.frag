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
    float ma = sin(length(p - vec2(0.57, 0.0)) * 9.26 - t * 7.52 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 13.59 - t * 4.32 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.67 + ph), vnoise2(p * 3.67 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.67 + 1.54 * wq + vec2(1.7, 9.2) + t * 0.66),
                   vnoise2(p * 3.67 + 3.87 * wq + vec2(8.3, 2.8) - t * 0.63));
    v = vnoise2(p * 3.67 + 1.89 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.51;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 0.31) * q1;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.42 / wf * sin(wf * 2.95 * q2.y + time * 0.69); q2.y += 0.49 / wf * cos(wf * 2.28 * q2.x + time * 0.65); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.60);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.43 + time * 0.35, vec3(0.50, 0.46, 0.45), vec3(0.39, 0.49, 0.49), vec3(1.02, 0.80, 1.19), vec3(0.47, 0.26, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
