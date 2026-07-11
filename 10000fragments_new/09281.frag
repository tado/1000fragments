uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.30 + jf * 4.0), cos(t * 0.27 * jf)) * 0.60;
        xs += sin(length(p - im) * 205.79 - t * 13.98 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.28; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 14.56 - t * 2.22 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.27 * cos(sa * 8.0 + t * 2.54 + ph);
    v = sin((sr - petal) * 8.62);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.77;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.24, length(q1) * 4.93 - time * 0.92); }
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.08, lr * 2.70 + time * -0.78); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.68);
	float d3 = fieldC(q3, time, 0.47);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.38 + time * 0.37, vec3(0.44, 0.56, 0.48), vec3(0.38, 0.35, 0.39), vec3(1.34, 0.94, 1.16), vec3(0.80, 0.33, 0.06));
	col = fract(col * 1.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
