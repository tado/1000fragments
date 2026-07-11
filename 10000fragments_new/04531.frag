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
    vec2 wq = vec2(vnoise2(p * 3.83 + ph), vnoise2(p * 3.83 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.83 + 3.34 * wq + vec2(1.7, 9.2) + t * 0.96),
                   vnoise2(p * 3.83 + 1.70 * wq + vec2(8.3, 2.8) - t * 0.79));
    v = vnoise2(p * 3.83 + 1.92 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	p = abs(p) - 0.31;
	p = rot2(0.78) * p;
	p = rot2(p.y * 2.92 + time * 0.96) * p;
	p *= 2.49;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.52 + time * 0.06, vec3(0.56, 0.44, 0.40), vec3(0.33, 0.35, 0.44), vec3(0.80, 1.09, 1.18), vec3(0.13, 0.15, 0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
