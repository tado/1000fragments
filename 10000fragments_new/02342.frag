uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 17.73 - t * 1.43 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 25.50 - t * 1.53 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.95; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 18.06 - t * 2.64 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.59, lr * 1.42 + time * -0.42); }
	q1 *= 2.43;
	q2 = rot2(q2.y * 1.88 + time * 1.19) * q2;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.21; q2 = rot2(1.45) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.28);
	float d = min(d1, d2);
	vec3 col = vec3(0.26, 0.22, 0.92) * (0.23 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
