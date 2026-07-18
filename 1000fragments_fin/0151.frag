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
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 3.59, t * 0.87)) - 0.5) * 1.37;
    v = exp(-abs(bx) * 10.70) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.82) * 0.87), cos((time * 0.82) * 0.77)) * 0.14;
	p.x = abs(p.x);
	p *= 1.87;
	{ float fr = length(p); p *= 1.0 + 0.30 * fr * fr; }
	p *= 1.23;
	p = rot2((time * 0.82) * -0.37) * p;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.72; }
	float d = field(p, (time * 0.82), 0.0);
	vec3 col = palette(d * 1.31 + (time * 0.82) * 0.19, vec3(0.29, 0.36, 0.23), vec3(0.23, 0.30, 0.14), vec3(1.04, 1.03, 0.96), vec3(0.09, 0.17, 0.07));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.55);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(0.933, 0.982, 1.042);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
