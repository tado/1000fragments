uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.23 + vec2(t * 2.12, -t * 2.74) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.85;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.55; p = rot2(1.56) * p; }
	p = rot2(0.97) * p;
	{ float fr = length(p); p *= 1.0 + -0.48 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.18), field(p, time, 2.36));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.02, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
