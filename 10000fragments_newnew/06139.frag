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
    float bx = p.x + (vnoise2(vec2(p.y * 1.46, t * 0.56)) - 0.5) * 0.97;
    v = exp(-abs(bx) * 6.80) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.34;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.75; kp = rot2(1.57) * kp; kp *= 1.45; }
    v = sin(kp.y * 1.63 - t * 4.12 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.73;
	p = (floor(p * 19.1) + 0.5) / 19.1;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.31);
	float d = d1 * d2;
	vec3 col = palette(d * 1.61 + time * 0.12, vec3(0.60, 0.52, 0.57), vec3(0.44, 0.36, 0.34), vec3(1.00, 0.84, 1.16), vec3(0.48, 0.46, 0.89));
	col = fract(col * 1.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
