uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.32 + vec2(t * 1.65, -t * 1.65) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	p = rot2(p.y * 1.41 + time * 0.35) * p;
	{ p = vec2(atan(p.y, p.x) * 1.72, length(p) * 5.78 - time * 0.57); }
	p += vec2(0.61, -0.77) * sin(length(p) * 5.01 - time * 1.18) * 0.17;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.28), field(p, time, 2.57));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
