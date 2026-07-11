uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 38.25 - t * 5.36 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 27.86 - t * 5.21 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.55; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 23.02 - t * 1.01 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 12.30);
    float gsh = hash21(vec2(grow, floor(t * 3.61))) - 0.5;
    float gx = p.x + gsh * 0.69;
    v = sin(gx * 8.99 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.42));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = fract(q2 * 2.26) - 0.5;
	{ float fr = length(q2); q2 *= 1.0 + 0.41 * fr * fr; }
	q3 = fract(q3 * 1.44) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.69);
	float d3 = fieldC(q3, time, 0.89);
	d2 = min(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.18));
	vec3 col = palette(d * 1.37 + time * 0.07, vec3(0.58, 0.42, 0.46), vec3(0.41, 0.42, 0.46), vec3(1.13, 1.22, 0.94), vec3(0.11, 0.40, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
