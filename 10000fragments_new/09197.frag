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
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.13 * cos(sa * 9.0 + t * 1.53 + ph);
    v = sin((sr - petal) * 18.22);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.23 + ph), vnoise2(p * 4.23 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.23 + 3.94 * wq + vec2(1.7, 9.2) + t * 0.88),
                   vnoise2(p * 4.23 + 3.73 * wq + vec2(8.3, 2.8) - t * 0.92));
    v = vnoise2(p * 4.23 + 2.28 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	p.y += sin(p.x * 6.33 + time * 2.57) * 0.31;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.13);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.76 + time * 0.24, vec3(0.44, 0.48, 0.40), vec3(0.45, 0.45, 0.47), vec3(0.81, 1.28, 0.79), vec3(0.61, 0.54, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
