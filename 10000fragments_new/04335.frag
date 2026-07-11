uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.52 + vec2(t * 2.05, -t * 0.72) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.89 + 0.18 * sin(t * 1.16)) + vec2(-0.58, 0.03) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 16; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 16.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.79;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.76; kp = rot2(1.07) * kp; kp *= 1.16; }
    v = sin(kp.y * 3.41 - t * 4.95 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = abs(q1) - 0.68;
	q2 *= 1.32;
	q3 = rot2(length(q3) * 1.88 + time * 0.57) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.25);
	float d3 = fieldC(q3, time, 0.75);
	d2 = min(d2, d3);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.15, 0.39), vec3(0.94, 0.73, 0.46), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
