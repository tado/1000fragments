uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.61) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 1.78 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.40 * sin(mf + 3.0) + ph), cos(t * 0.76 * cos(mf + 3.0) + ph));
        ms += 0.097 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.81 + sr * 5.07 - t * 4.72 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 1.88) - 0.5;
	q1 = abs(q1) - 0.70;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.27 / wf * sin(wf * 3.92 * q2.y + time * 0.62); q2.y += 0.38 / wf * cos(wf * 1.80 * q2.x + time * 1.02); }
	q2 = rot2(q2.y * -2.90 + time * 0.52) * q2;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	q3 = fract(q3 * 1.79) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.31);
	float d3 = fieldC(q3, time, 0.90);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.96, 0.31, 0.78) * (0.19 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
