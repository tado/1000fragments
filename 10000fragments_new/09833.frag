uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.71; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 13.10 - t * 3.26 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.38;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.53; kp = rot2(2.61) * kp; kp *= 1.31; }
    v = sin(kp.y * 2.80 - t * 4.11 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.78;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.44; kp = rot2(1.92) * kp; kp *= 1.21; }
    v = sin(kp.x * 3.63 - t * 2.88 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.86;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = (floor(q1 * 16.2) + 0.5) / 16.2;
	{ float fr = length(q2); q2 *= 1.0 + 0.59 * fr * fr; }
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 2.15, lr * 2.36 + time * 0.53); }
	q3 = rot2(time * -0.40) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.48);
	float d3 = fieldC(q3, time, 1.48);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.04 + time * 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
