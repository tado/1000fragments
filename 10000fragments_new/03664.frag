uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.51;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.76; kp = rot2(2.60) * kp; kp *= 1.31; }
    v = sin(kp.y * 1.11 - t * 1.16 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.09 + t * 4.70 + ph) + sin(p.y * 8.79 - t * 4.70 + ph)
        + sin((p.x + p.y) * 10.92 + t * 4.70 + ph) + sin(length(p) * 5.33 - t * 4.70 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.77 + 0.25 * sin(t * 0.78)) + vec2(-0.65, -0.01) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 31; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 31.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = abs(q2) - 0.57;
	q2 = (floor(q2 * 14.9) + 0.5) / 14.9;
	q3 = rot2(length(q3) * 1.81 + time * 1.18) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.57);
	float d3 = fieldC(q3, time, 1.28);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.46, 0.35, 0.98) * (0.13 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
