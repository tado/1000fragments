uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.69;
    float pk = 6.2831853 / 8.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 19.44 - t * 2.01 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.31 * sin(mf + 3.0) + ph), cos(t * 1.12 * cos(mf + 3.0) + ph));
        ms += 0.049 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.77;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.63; kp = rot2(2.62) * kp; kp *= 1.32; }
    v = sin(kp.x * 3.85 - t * 3.22 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.84;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = abs(q1) - 0.76;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.76);
	float d3 = fieldC(q3, time, 0.52);
	d2 = max(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.69));
	vec3 col = palette(d * 0.42 + time * 0.06, vec3(0.44, 0.52, 0.40), vec3(0.30, 0.46, 0.38), vec3(1.14, 0.76, 1.04), vec3(0.69, 0.40, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
