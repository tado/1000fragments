uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.75;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.68; kp = rot2(1.35) * kp; kp *= 1.17; }
    v = sin(kp.y * 1.62 - t * 1.20 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 2.98 * sin(t * 0.94) + t * 3.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q1 += vec2(-0.60, -0.94) * sin(length(q1) * 3.33 - time * 1.42) * 0.20;
	q2 *= 2.80;
	q2.y += sin(q2.x * 2.30 + time * 3.24) * 0.36;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.71);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.17, 0.19), vec3(0.62, 0.86, 0.83), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
