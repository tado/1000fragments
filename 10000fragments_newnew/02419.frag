uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.69 + vec2(t * 0.58, -t * 1.04);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.01;
	p += vec2(0.53, -0.16) * sin(length(p) * 2.97 - time * 1.45) * 0.25;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.35; p = rot2(1.71) * p; }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.81; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.19, vec3(0.53, 0.49, 0.43), vec3(0.37, 0.45, 0.34), vec3(1.39, 1.16, 0.72), vec3(0.00, 0.43, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
