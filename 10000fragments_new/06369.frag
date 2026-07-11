uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.03 - t * 5.80 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.39; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 8.03 - t * 0.79 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.23);
    float gsh = hash21(vec2(grow, floor(t * 7.18))) - 0.5;
    float gx = p.x + gsh * 1.12;
    v = sin(gx * 18.46 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.26));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 2.57;
	q2 = rot2(q2.y * 3.48 + time * 0.42) * q2;
	q2 *= 2.51;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.48, lr * 1.11 + time * -0.23); }
	{ float fr = length(q3); q3 *= 1.0 + 0.24 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.78);
	float d3 = fieldC(q3, time, 0.72);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.38, 0.15, 0.24), vec3(0.65, 0.67, 0.82), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
