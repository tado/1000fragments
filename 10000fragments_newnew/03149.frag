uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.47; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 17.24 - t * 1.82 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 6.95 * sin(t * 0.74) + t * 3.93 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.72;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.10, lr * 1.10 + time * -0.31); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.72);
	float d = max(d1, d2);
	vec3 col = vec3(0.98, 0.44, 0.64) * (0.22 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= 0.87 + 0.20 * sin(gl_FragCoord.y * 2.62 + time * 9.98);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
