uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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
    vec2 wq = vec2(vnoise2(p * 4.48 + ph), vnoise2(p * 4.48 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.48 + 1.98 * wq + vec2(1.7, 9.2) + t * 0.37),
                   vnoise2(p * 4.48 + 1.67 * wq + vec2(8.3, 2.8) - t * 0.70));
    v = vnoise2(p * 4.48 + 1.53 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.17 * cos(sa * 6.0 + t * 1.65 + ph);
    v = sin((sr - petal) * 15.65);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.39;
	p *= 1.0 + 0.21 * sin(time * 3.96);
	p = rot2(length(p) * -3.48 + time * 1.00) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.23);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.54 + time * 0.17, vec3(0.49, 0.58, 0.40), vec3(0.40, 0.44, 0.39), vec3(1.18, 1.13, 1.18), vec3(0.57, 0.94, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
