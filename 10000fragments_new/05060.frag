uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.19 + sin(p.y * 5.30 + t * 4.88) * 2.65 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.66; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 11.02 - t * 0.78 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.13) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 2.85 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.11; q1 = rot2(0.57) * q1; }
	{ float fr = length(q2); q2 *= 1.0 + -0.57 * fr * fr; }
	q3 = (floor(q3 * 8.6) + 0.5) / 8.6;
	for(int fo = 0; fo < 3; fo++){ q3 = abs(q3) - 0.36; q3 = rot2(2.38) * q3; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.68);
	float d3 = fieldC(q3, time, 0.80);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = palette(d * 0.79 + time * 0.01, vec3(0.53, 0.55, 0.42), vec3(0.44, 0.33, 0.50), vec3(1.36, 0.80, 1.39), vec3(0.16, 0.50, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
