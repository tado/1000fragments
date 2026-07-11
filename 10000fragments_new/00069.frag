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
    vec2 wq = vec2(vnoise2(p * 2.97 + ph), vnoise2(p * 2.97 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.97 + 3.85 * wq + vec2(1.7, 9.2) + t * 1.18),
                   vnoise2(p * 2.97 + 1.71 * wq + vec2(8.3, 2.8) - t * 0.56));
    v = vnoise2(p * 2.97 + 1.68 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 1.74 + time * 0.48) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.80 + time * 0.18, vec3(0.56, 0.54, 0.51), vec3(0.43, 0.36, 0.39), vec3(1.33, 1.16, 1.31), vec3(0.22, 0.23, 0.46));
	col = fract(col * 1.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
