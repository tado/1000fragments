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
    v = 0.5 * sin(length(p) * 29.58 - t * 7.80 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.96; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 12.56 - t * 3.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.26;
	p = rot2(1.62) * p;
	p = abs(p) - 0.51;
	{ float fr = length(p); p *= 1.0 + -0.24 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.52);
	float d = d1 + d2;
	vec3 col = palette(d * 1.80 + time * 0.11, vec3(0.55, 0.41, 0.56), vec3(0.35, 0.33, 0.32), vec3(1.09, 1.10, 0.79), vec3(0.42, 0.18, 0.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
