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
    v = sin(p.x * 9.29 + sin(p.y * 1.67 + t * 3.22) * 2.73 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.67; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 18.68 - t * 3.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.45, 0.52) * sin(length(p) * 5.53 - time * 0.73) * 0.36;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.81);
	float d = d1 * d2;
	vec3 col = palette(d * 0.63 + time * 0.14, vec3(0.51, 0.47, 0.59), vec3(0.46, 0.44, 0.41), vec3(1.07, 1.12, 1.19), vec3(0.09, 0.12, 0.52));
	col = fract(col * 1.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
