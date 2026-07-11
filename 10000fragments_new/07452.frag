uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.11;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.50; kp = rot2(0.33) * kp; kp *= 1.15; }
    v = sin(kp.x * 2.78 - t * 3.77 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.81 + t * 1.66 + ph) * 0.7;
    float wb = sin(p.y * 5.53 - t * 3.78 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.55;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 4.06 + time * 3.30) * 0.35;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 = fract(q2 * 1.44) - 0.5;
	q2 *= 2.80;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.97);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.24, 0.31), vec3(0.88, 0.93, 0.72), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
