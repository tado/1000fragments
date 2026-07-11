uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.48, t * 1.62 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.09;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.42; p = rot2(2.28) * p; }
	p += vec2(-0.33, 0.27) * sin(length(p) * 4.70 - time * 1.40) * 0.36;
	{ p = vec2(atan(p.y, p.x) * 2.42, length(p) * 2.16 - time * 0.75); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.16, lr * 1.89 + time * -0.23); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.45), field(p, time, 0.90));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.22 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
