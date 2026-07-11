uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.64;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.44; kp = rot2(2.62) * kp; kp *= 1.21; }
    v = sin(kp.x * 1.88 - t * 4.91 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.03 + t * 0.75 + ph) * 0.7;
    float wb = sin(p.y * 12.06 - t * 3.75 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.25;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.54;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.26);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.76 + time * 0.34, vec3(0.54, 0.49, 0.42), vec3(0.34, 0.39, 0.48), vec3(0.99, 1.24, 1.28), vec3(0.13, 0.57, 0.96));
	col = fract(col * 1.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
