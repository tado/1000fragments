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

float field(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 1.46, t * 0.60)) - 0.5) * 0.68;
    v = exp(-abs(bx) * 4.96) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.71;
	p = (floor(p * 10.0) + 0.5) / 10.0;
	p = rot2(2.71) * p;
	p = sin(p * 2.72 + time * 2.44) * 1.15;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.63;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.61), field(p, time, 1.23));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.95 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
