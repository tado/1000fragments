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
    vec2 tp = p * 6.52; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 11.98 - t * 1.82 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.78 + jf * 4.0), cos(t * 0.31 * jf)) * 0.61;
        xs += sin(length(p - im) * 63.69 - t * 8.92 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.10;
	p = rot2(time * 0.67) * p;
	p = rot2(length(p) * 2.33 + time * 1.10) * p;
	p = rot2(p.y * 1.70 + time * 0.26) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.55);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.01 + time * 0.25, vec3(0.49, 0.57, 0.48), vec3(0.45, 0.38, 0.31), vec3(1.23, 0.87, 0.77), vec3(0.60, 0.17, 0.98));
	col = mod(col * 2.36, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
