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
    float bx = p.x + (vnoise2(vec2(p.y * 3.15, t * 2.84)) - 0.5) * 1.48;
    v = exp(-abs(bx) * 6.25) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	p.x += sin(p.y * 4.76 + time * 2.14) * 0.25;
	p = rot2(time * -1.35) * p;
	p = rot2(p.y * -2.52 + time * 1.02) * p;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.71;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.61 + time * 0.06, vec3(0.42, 0.40, 0.53), vec3(0.49, 0.42, 0.35), vec3(0.83, 0.87, 1.10), vec3(0.18, 0.32, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
