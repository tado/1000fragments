uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.55; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 15.75 - t * 1.20 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.30 * sin(mf + 3.0) + ph), cos(t * 1.45 * cos(mf + 3.0) + ph));
        ms += 0.094 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.94, lr * 1.54 + time * -0.97); }
	q1 = rot2(0.53) * q1;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.51; q2 = rot2(1.08) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.45);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.87 + time * 0.09, vec3(0.54, 0.52, 0.54), vec3(0.47, 0.46, 0.47), vec3(0.93, 0.91, 1.20), vec3(0.10, 0.57, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
