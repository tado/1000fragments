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
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.60 + jf * 4.0), cos(t * 0.34 * jf)) * 0.93;
        xs += sin(length(p - im) * 202.09 - t * 12.21 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.20; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 26.69 - t * 2.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	p = rot2(time * -0.84) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.19; p = rot2(0.57) * p; }
	p = rot2(length(p) * -3.82 + time * 0.91) * p;
	p += vec2(-0.67, 0.47) * sin(length(p) * 3.85 - time * 1.39) * 0.18;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.62);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.49 + time * 0.18, vec3(0.42, 0.47, 0.51), vec3(0.47, 0.34, 0.47), vec3(1.02, 1.06, 0.91), vec3(0.66, 0.16, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
