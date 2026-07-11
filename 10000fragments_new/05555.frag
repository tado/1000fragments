uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.54 + sr * 7.46 - t * 2.22 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.15) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 3.57 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.42;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.58; kp = rot2(1.35) * kp; kp *= 1.38; }
    v = sin(kp.y * 2.73 - t * 1.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.40;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * 1.67 + time * 0.44) * q1;
	q1 += vec2(0.38, 0.80) * sin(length(q1) * 5.12 - time * 1.01) * 0.22;
	q2 = rot2(time * -0.67) * q2;
	q3 = rot2(q3.y * -3.32 + time * 1.02) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.75);
	float d3 = fieldC(q3, time, 1.01);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.12, 0.70, 1.34) + vec3(0.03, 0.03, 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
