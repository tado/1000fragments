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
    vec2 tp = p * 5.96; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 11.89 - t * 1.83 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.07; vec2 jc = vec2(-0.26 + 0.3 * sin(t * 0.55 + ph), -0.43 + 0.3 * cos(t * 0.55 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(18) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.72;
	p *= 1.66;
	p = abs(p);
	p += vec2(-0.23, -0.74) * sin(length(p) * 3.50 - time * 1.55) * 0.32;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.43);
	float d = d1 * d2;
	vec3 col = palette(d * 1.33 + time * 0.22, vec3(0.44, 0.59, 0.40), vec3(0.31, 0.34, 0.42), vec3(1.04, 0.90, 1.25), vec3(0.96, 0.14, 0.49));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
