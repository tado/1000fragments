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
    vec2 wq = vec2(vnoise2(p * 4.67 + ph), vnoise2(p * 4.67 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.67 + 2.18 * wq + vec2(1.7, 9.2) + t * 0.90),
                   vnoise2(p * 4.67 + 3.19 * wq + vec2(8.3, 2.8) - t * 1.07));
    v = vnoise2(p * 4.67 + 1.85 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.32;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.46; kp = rot2(2.45) * kp; kp *= 1.26; }
    v = sin(kp.y * 3.87 - t * 4.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.86);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.50 + time * 0.16, vec3(0.50, 0.47, 0.44), vec3(0.47, 0.42, 0.48), vec3(1.09, 0.85, 0.77), vec3(0.07, 0.21, 0.07));
	col = mod(col * 1.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
