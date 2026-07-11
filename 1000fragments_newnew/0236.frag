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
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.56;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.77; kp = rot2(1.90) * kp; kp *= 1.30; }
    v = sin(kp.x * 1.52 - t * 1.57 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.39 * vnoise2(p * 4.07 + t * 1.33);
    v = sin(wr * 25.46 - t * 2.09 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 1.27) - 0.5;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.23; q2 = rot2(1.84) * q2; }
	float d1 = fieldA(q1, (time * 0.67), 0.0);
	float d2 = fieldB(q2, (time * 0.67), 0.37);
	float d = abs(d1 - d2);
	vec3 col = palette((d) * 0.77 + (time * 0.67) * 0.07, vec3(0.36, 0.34, 0.34), vec3(0.17, 0.14, 0.20), vec3(0.60, 0.81, 0.59), vec3(0.38, 0.42, 0.55));
	col += (hash21(gl_FragCoord.xy + fract((time * 0.67)) * 100.0) - 0.5) * 0.11;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.932, 0.968, 1.043) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
