uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.15; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 17.81 - t * 3.84 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.84 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.59 + t * 2.18 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.02;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.65; kp = rot2(1.72) * kp; kp *= 1.25; }
    v = sin(kp.y * 3.26 - t * 3.34 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q2); q2 *= 1.0 + 0.58 * fr * fr; }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.31, lr * 1.70 + time * 0.49); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.73);
	float d3 = fieldC(q3, time, 1.01);
	d2 = 0.5 * (d2 + d3);
	float d = d1 * d2;
	vec3 col = vec3(0.85, 0.27, 0.25) * (0.08 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
