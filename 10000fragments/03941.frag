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
    vec2 tp = p * 8.11; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 23.61 - t * 2.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.34;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.40; p = rot2(2.27) * p; }
	p *= 2.57;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 3.20 * p.y + time * 0.98); p.y += 0.33 / wf * cos(wf * 3.20 * p.x + time * 1.62); }
	p = rot2(p.y * 2.31 + time * 0.84) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.76 + time * 0.00, vec3(0.58, 0.50, 0.47), vec3(0.44, 0.31, 0.33), vec3(1.36, 0.87, 0.94), vec3(0.84, 0.65, 0.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
