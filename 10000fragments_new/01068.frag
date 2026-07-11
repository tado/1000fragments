uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.43;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.70; kp = rot2(2.05) * kp; kp *= 1.34; }
    v = sin(kp.y * 1.12 - t * 2.27 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.59; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 10.23 - t * 2.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.32;
	p = rot2(time * 1.53) * p;
	{ p = vec2(atan(p.y, p.x) * 2.01, length(p) * 2.19 - time * 0.56); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.15; p = rot2(0.74) * p; }
	{ float fr = length(p); p *= 1.0 + 0.67 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.79);
	float d = d1 * d2;
	vec3 col = palette(d * 1.37 + time * 0.05, vec3(0.48, 0.45, 0.55), vec3(0.44, 0.38, 0.48), vec3(1.34, 0.78, 0.78), vec3(0.47, 0.84, 0.31));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
