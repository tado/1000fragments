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
    vec2 tp = p * 9.53; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 15.60 - t * 3.75 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.77, t * 1.31 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.72;
	p += vec2(-0.32, 0.61) * sin(length(p) * 5.87 - time * 1.85) * 0.12;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.76);
	float d = d1 * d2;
	vec3 col = palette(d * 0.76 + time * 0.10, vec3(0.41, 0.47, 0.44), vec3(0.35, 0.45, 0.44), vec3(0.93, 0.85, 1.07), vec3(0.53, 0.99, 0.38));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
