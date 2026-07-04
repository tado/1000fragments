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
    vec2 tp = p * 9.09; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 17.61 - t * 2.37 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.04; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 13.03 - t * 2.31 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.58;
	{ float fr = length(p); p *= 1.0 + 0.65 * fr * fr; }
	p = rot2(time * 0.96) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.81);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.07 + time * 0.11, vec3(0.40, 0.54, 0.51), vec3(0.31, 0.45, 0.40), vec3(1.23, 0.94, 0.91), vec3(0.30, 0.20, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
