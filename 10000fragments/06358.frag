uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.45;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.51; kp = rot2(1.12) * kp; kp *= 1.16; }
    v = sin(kp.x * 1.74 - t * 2.27 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.35;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.57; kp = rot2(2.22) * kp; kp *= 1.35; }
    v = sin(kp.y * 2.75 - t * 1.85 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.52, 0.0)) * 11.13 - t * 7.03 + ph);
    float mb = sin(length(p + vec2(0.52, 0.0)) * 19.52 - t * 4.51 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	q3.y += sin(q3.x * 6.09 + time * 3.41) * 0.24;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.36);
	float d3 = fieldC(q3, time, 0.11);
	d2 = d2 * d3;
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.53, 0.85, 0.72) * (0.10 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
