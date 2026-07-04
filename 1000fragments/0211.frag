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
    float bx = p.x + (vnoise2(vec2(p.y * 2.72, t * 0.76)) - 0.5) * 0.89;
    v = exp(-abs(bx) * 9.79) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.15) * p * 13.43;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.64;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = palette(d * 1.03 + time * 0.14, vec3(0.41, 0.52, 0.56), vec3(0.35, 0.42, 0.38), vec3(1.19, 1.25, 1.38), vec3(0.92, 0.58, 0.12)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
