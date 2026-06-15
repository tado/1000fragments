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
    vec2 tp = p * 9.11; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 15.17 - t * 2.18 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 20.09 - t * 7.16 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 14.30 - t * 7.16 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	p = fract(p * 2.52) - 0.5;
	p += vec2(-0.98, -0.04) * sin(length(p) * 5.84 - time * 0.87) * 0.30;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.69);
	float d = d1 + d2;
	vec3 col = palette(d * 1.20 + time * 0.02, vec3(0.43, 0.44, 0.47), vec3(0.46, 0.35, 0.50), vec3(1.04, 1.18, 1.15), vec3(0.85, 0.62, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
