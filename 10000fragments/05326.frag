uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.09;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.44; kp = rot2(2.38) * kp; kp *= 1.18; }
    v = sin(kp.y * 2.99 - t * 1.53 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.19 - t * 5.88 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.65;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 8.83 - t * 2.00 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3 = rot2(2.43) * q3;
	q3 += vec2(0.92, -0.91) * sin(length(q3) * 2.59 - time * 1.49) * 0.28;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.01);
	float d3 = fieldC(q3, time, 1.80);
	d2 = d2 * d3;
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.00, 0.32, 0.40), vec3(0.60, 0.95, 0.82), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
