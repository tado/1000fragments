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
    float bx = p.x + (vnoise2(vec2(p.y * 3.63, t * 2.92)) - 0.5) * 0.96;
    v = exp(-abs(bx) * 9.13) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.27) - 0.5;
	p = rot2(1.59) * p;
	p = rot2(length(p) * -1.28 + time * 0.81) * p;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.39; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.80, 0.26, 0.39) * (0.23 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
