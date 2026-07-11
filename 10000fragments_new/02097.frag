uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.38; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 26.71 - t * 2.33 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.36 + 0.24 * cos(sa * 5.0 + t * 1.72 + ph);
    v = sin((sr - petal) * 12.88);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.67 * fr * fr; }
	q1 += vec2(-0.75, -0.98) * sin(length(q1) * 3.25 - time * 1.67) * 0.23;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.87, lr * 1.95 + time * -0.44); }
	q2 += vec2(0.90, -0.05) * sin(length(q2) * 4.59 - time * 1.74) * 0.21;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.40);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.37));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.23, 0.32), vec3(0.63, 0.94, 0.83), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
