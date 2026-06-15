uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.35; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 25.78 - t * 3.29 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.31 + t * 0.82 + ph) + sin(p.y * 8.49 - t * 0.82 + ph)
        + sin((p.x + p.y) * 7.43 + t * 0.82 + ph) + sin(length(p) * 12.34 - t * 0.82 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	{ p = vec2(atan(p.y, p.x) * 2.55, length(p) * 4.55 - time * 0.15); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.41; p = rot2(0.65) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.91);
	float d = d1 + d2;
	vec3 col = palette(d * 0.69 + time * 0.15, vec3(0.50, 0.59, 0.59), vec3(0.39, 0.34, 0.42), vec3(1.33, 1.06, 0.97), vec3(0.42, 0.15, 0.02));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
