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
    float bx = p.x + (vnoise2(vec2(p.y * 3.60, t * 1.85)) - 0.5) * 1.23;
    v = exp(-abs(bx) * 10.01) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 1.74 + time * 0.72) * p;
	{ float fr = length(p); p *= 1.0 + 0.58 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.86, 0.95, 0.70) * (0.25 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = fract(col * 1.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
