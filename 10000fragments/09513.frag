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
    float bx = p.x + (vnoise2(vec2(p.y * 1.65, t * 1.34)) - 0.5) * 1.07;
    v = exp(-abs(bx) * 7.48) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.92;
	p *= 1.78;
	p = rot2(p.y * -3.67 + time * 0.30) * p;
	p *= 1.0 + 0.18 * sin(time * 4.87);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.52; p = rot2(1.62) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.15, vec3(0.41, 0.58, 0.46), vec3(0.35, 0.32, 0.41), vec3(1.34, 1.13, 1.25), vec3(0.21, 0.73, 0.29));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
