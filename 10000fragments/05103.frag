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
    vec2 kp = p * 1.99;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.70; kp = rot2(2.42) * kp; kp *= 1.31; }
    v = sin(kp.x * 1.78 - t * 2.82 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.20 * vnoise2(p * 4.90 + t * 1.36);
    v = sin(wr * 11.52 - t * 1.00 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.75;
	p *= 2.60;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.49);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.85 + time * 0.03, vec3(0.44, 0.51, 0.48), vec3(0.47, 0.41, 0.33), vec3(1.37, 1.37, 1.28), vec3(0.89, 0.09, 0.99));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
