uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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
    v = 0.25 * (sin(p.x * 6.43 + t * 1.53 + ph) + sin(p.y * 12.17 - t * 1.53 + ph)
        + sin((p.x + p.y) * 5.84 + t * 1.53 + ph) + sin(length(p) * 4.88 - t * 1.53 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.82; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 21.57 - t * 2.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.61 * fr * fr; }
	p *= 2.69;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.04);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.56 + time * 0.11, vec3(0.50, 0.49, 0.46), vec3(0.38, 0.50, 0.40), vec3(1.28, 1.09, 1.04), vec3(0.95, 0.69, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
