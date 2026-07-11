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
    vec2 wq = vec2(vnoise2(p * 2.24 + ph), vnoise2(p * 2.24 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.24 + 2.00 * wq + vec2(1.7, 9.2) + t * 0.67),
                   vnoise2(p * 2.24 + 3.96 * wq + vec2(8.3, 2.8) - t * 1.19));
    v = vnoise2(p * 2.24 + 3.98 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.62;
	p = rot2(time * 0.34) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.24, vec3(0.57, 0.46, 0.57), vec3(0.35, 0.48, 0.37), vec3(1.28, 1.29, 0.89), vec3(0.83, 0.98, 0.37));
	col = fract(col * 1.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
