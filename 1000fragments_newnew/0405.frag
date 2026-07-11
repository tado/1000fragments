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
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.34;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.73; kp = rot2(1.72) * kp; kp *= 1.15; }
    v = sin(kp.y * 1.76 - t * 1.31 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.91 + ph), vnoise2(p * 4.91 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.91 + 3.87 * wq + vec2(1.7, 9.2) + t * 0.38),
                   vnoise2(p * 4.91 + 1.57 * wq + vec2(8.3, 2.8) - t * 0.89));
    v = vnoise2(p * 4.91 + 3.17 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.29;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.79; }
	float d1 = field(p, (time * 0.61), 0.0);
	float d2 = field2(p, (time * 0.61), 1.72);
	float d = d1 * d2;
	vec3 col = palette(d * 0.43 + (time * 0.61) * 0.10, vec3(0.21, 0.26, 0.31), vec3(0.19, 0.15, 0.17), vec3(0.58, 0.78, 0.61), vec3(0.44, 0.56, 0.23));
	col *= 0.82 + 0.15 * sin(gl_FragCoord.y * 1.37 + (time * 0.61) * 16.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(1.034, 0.973, 0.931) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
