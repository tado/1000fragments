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
    vec2 wq = vec2(vnoise2(p * 3.36 + ph), vnoise2(p * 3.36 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.36 + 2.73 * wq + vec2(1.7, 9.2) + t * 0.59),
                   vnoise2(p * 3.36 + 3.49 * wq + vec2(8.3, 2.8) - t * 0.77));
    v = vnoise2(p * 3.36 + 3.68 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.43;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.80; kp = rot2(1.40) * kp; kp *= 1.37; }
    v = sin(kp.x * 3.44 - t * 4.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.06;
	p.y += sin(p.x * 2.32 + time * 2.38) * 0.18;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.08);
	float d = d1 * d2;
	vec3 col = palette(d * 0.81 + time * 0.05, vec3(0.60, 0.52, 0.60), vec3(0.46, 0.43, 0.47), vec3(1.35, 1.13, 0.99), vec3(0.63, 0.33, 0.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
