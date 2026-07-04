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
    float bx = p.x + (vnoise2(vec2(p.y * 1.06, t * 0.67)) - 0.5) * 0.57;
    v = exp(-abs(bx) * 9.30) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	p *= 1.44;
	{ p = vec2(atan(p.y, p.x) * 2.15, length(p) * 4.12 - time * 0.87); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.49, lr * 2.50 + time * 0.64); }
	p = rot2(length(p) * 1.72 + time * 0.33) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.64), field(p, time, 1.28));
	col = 0.5 + 0.5 * col;
	col *= 0.84 + 0.13 * sin(gl_FragCoord.y * 2.47 + time * 16.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
