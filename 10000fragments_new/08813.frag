uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.59 + 0.25 * pow(abs(cos(ra * 4.0 + t * 1.61)), 2.15);
    v = sin((rr - pet) * 19.04 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.31; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 16.35 - t * 3.59 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.99 + t * 3.12 + ph) + sin(p.y * 2.37 - t * 3.12 + ph)
        + sin((p.x + p.y) * 9.91 + t * 3.12 + ph) + sin(length(p) * 8.02 - t * 3.12 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.54;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.22 / wf * sin(wf * 2.03 * q1.y + time * 1.28); q1.y += 0.43 / wf * cos(wf * 2.57 * q1.x + time * 1.83); }
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.94, lr * 2.89 + time * -0.27); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.83);
	float d3 = fieldC(q3, time, 1.92);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.11));
	vec3 col = vec3(0.32, 0.18, 0.89) * (0.08 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.58 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
