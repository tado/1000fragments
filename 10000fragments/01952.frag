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
    float ma = sin(length(p - vec2(0.48, 0.0)) * 32.33 - t * 1.46 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 34.41 - t * 1.46 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.35; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 25.22 - t * 3.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.66 * p.y + time * 1.48); p.y += 0.44 / wf * cos(wf * 2.99 * p.x + time * 0.90); }
	p = abs(p) - 0.41;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.19; p = rot2(2.21) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.23);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.50 + time * 0.09, vec3(0.53, 0.59, 0.55), vec3(0.32, 0.32, 0.44), vec3(0.81, 0.79, 1.36), vec3(0.82, 0.79, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
