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
    vec2 tp = p * 8.16; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 26.47 - t * 0.62 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.89 + ph), vnoise2(p * 4.89 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.89 + 3.45 * wq + vec2(1.7, 9.2) + t * 0.79),
                   vnoise2(p * 4.89 + 1.27 * wq + vec2(8.3, 2.8) - t * 0.40));
    v = vnoise2(p * 4.89 + 2.46 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.51;
	p = (floor(p * 19.3) + 0.5) / 19.3;
	p = fract(p * 1.96) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.89, lr * 2.21 + time * 0.94); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.35);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.70 + time * 0.15, vec3(0.55, 0.52, 0.59), vec3(0.31, 0.35, 0.43), vec3(1.27, 0.94, 0.75), vec3(0.67, 0.32, 0.77));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
