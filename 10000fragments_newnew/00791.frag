uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
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
    vec2 wq = vec2(vnoise2(p * 4.32 + ph), vnoise2(p * 4.32 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.32 + 1.21 * wq + vec2(1.7, 9.2) + t * 0.79),
                   vnoise2(p * 4.32 + 1.47 * wq + vec2(8.3, 2.8) - t * 1.07));
    v = vnoise2(p * 4.32 + 1.92 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.79; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 17.27 - t * 3.38 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.52;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.71);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.65 + time * 0.30, vec3(0.59, 0.42, 0.42), vec3(0.42, 0.38, 0.33), vec3(0.94, 0.99, 1.29), vec3(0.29, 0.26, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
