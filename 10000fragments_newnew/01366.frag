uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.45 + vec2(t * 0.84, -t * 2.41) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.30; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 18.60 - t * 3.44 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.79 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.13 + t * 2.93 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.24 * fr * fr; }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.86, lr * 1.95 + time * -0.32); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.23);
	float d3 = fieldC(q3, time, 1.73);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.76 + time * 0.35, vec3(0.45, 0.44, 0.40), vec3(0.36, 0.45, 0.38), vec3(0.93, 1.30, 1.37), vec3(0.53, 0.40, 0.61));
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 1.67 + time * 11.54);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
