uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.01) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 1.47 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.53; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 17.10 - t * 3.69 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.51;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 18.6) + 0.5) / 18.6;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.04, lr * 1.07 + time * 0.73); }
	q2 = fract(q2 * 2.69) - 0.5;
	q2 = abs(q2) - 0.63;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.52);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.32));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.27, 0.07), vec3(0.82, 0.89, 0.90), cc);
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
