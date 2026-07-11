uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 32.65 - t * 3.93 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 33.75 - t * 3.62 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.31 * sin(mf + 3.0) + ph), cos(t * 2.43 * cos(mf + 3.0) + ph));
        ms += 0.088 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.53 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.72 + t * 1.12 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(time * -1.38) * q1;
	q2 = abs(q2) - 0.29;
	q2 = rot2(0.51) * q2;
	q3 = rot2(q3.y * -3.99 + time * 0.33) * q3;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q3.x += 0.24 / wf * sin(wf * 1.58 * q3.y + time * 1.49); q3.y += 0.48 / wf * cos(wf * 2.47 * q3.x + time * 1.27); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.24);
	float d3 = fieldC(q3, time, 1.64);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.91 + time * 0.27);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
