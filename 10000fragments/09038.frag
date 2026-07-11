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
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.99 + jf * 4.0), cos(t * 0.20 * jf)) * 0.87;
        xs += sin(length(p - im) * 219.87 - t * 9.33 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.16; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 20.24 - t * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.10;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 3.86 * p.y + time * 1.25); p.y += 0.37 / wf * cos(wf * 3.70 * p.x + time * 0.85); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.99);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.70 + time * 0.18, vec3(0.51, 0.47, 0.51), vec3(0.41, 0.48, 0.41), vec3(0.71, 1.14, 1.20), vec3(0.64, 0.08, 0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
