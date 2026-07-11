uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.85; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 11.58 - t * 2.65 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.84 + t * 2.09 + ph) * 0.7;
    float wb = sin(p.y * 19.59 - t * 2.45 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.49;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.78;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.11) - 0.5;
	q1 = abs(q1) - 0.74;
	q2 = fract(q2 * 2.63) - 0.5;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.22, lr * 1.46 + time * -0.67); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.92);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.59 + time * 0.06, vec3(0.48, 0.58, 0.42), vec3(0.49, 0.34, 0.39), vec3(0.76, 0.87, 1.24), vec3(0.65, 0.78, 1.00));
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 2.35 + time * 8.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
