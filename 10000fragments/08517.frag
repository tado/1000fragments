uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.11; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 10.02 - t * 0.53 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.15 + vec2(t * 1.19, -t * 0.61) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.11;
	{ float fr = length(p); p *= 1.0 + 0.42 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.34, lr * 1.51 + time * -0.84); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.28);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.52 + time * 0.14, vec3(0.44, 0.59, 0.58), vec3(0.35, 0.44, 0.40), vec3(0.86, 0.80, 1.37), vec3(0.17, 0.18, 0.93));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
