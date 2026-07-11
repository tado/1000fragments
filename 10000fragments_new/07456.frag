uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 14.93);
    float gsh = hash21(vec2(grow, floor(t * 9.39))) - 0.5;
    float gx = p.x + gsh * 0.41;
    v = sin(gx * 15.65 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.66));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.90;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.44; kp = rot2(1.30) * kp; kp *= 1.31; }
    v = sin(kp.x * 3.12 - t * 3.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.73;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.47);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.98 + time * 0.06, vec3(0.58, 0.43, 0.55), vec3(0.45, 0.48, 0.43), vec3(1.24, 1.22, 1.14), vec3(0.93, 0.51, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
