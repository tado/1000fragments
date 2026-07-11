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
    vec2 tp = p * 7.23; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 24.90 - t * 3.07 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.32;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.24 * p.y + time * 1.94); p.y += 0.46 / wf * cos(wf * 3.12 * p.x + time * 1.85); }
	p = fract(p * 1.07) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.46 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.12, vec3(0.51, 0.44, 0.55), vec3(0.42, 0.32, 0.32), vec3(1.26, 0.81, 0.83), vec3(0.83, 0.69, 0.74));
	col = mod(col * 1.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
