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
    vec2 tp = p * 5.12; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 18.47 - t * 3.83 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.15; vec2 jc = vec2(-0.22 + 0.3 * sin(t * 0.81 + ph), -0.43 + 0.3 * cos(t * 0.81 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 21; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(21) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.01;
	p += vec2(-0.61, 0.96) * sin(length(p) * 3.94 - time * 1.82) * 0.22;
	p *= 3.33;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 1.51 * p.y + time * 1.10); p.y += 0.42 / wf * cos(wf * 2.52 * p.x + time * 1.63); }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.87);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.32 + time * 0.26, vec3(0.53, 0.54, 0.46), vec3(0.39, 0.44, 0.30), vec3(1.34, 1.06, 0.91), vec3(0.04, 0.68, 0.15));
	col = mod(col * 1.27, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
