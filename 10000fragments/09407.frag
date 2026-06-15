uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.79 + vec2(t * 0.73, -t * 0.73) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	{ p = vec2(atan(p.y, p.x) * 1.30, length(p) * 3.15 - time * 0.67); }
	p *= 2.48;
	p = rot2(time * -1.35) * p;
	{ float fr = length(p); p *= 1.0 + 0.20 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.86, 0.58, 1.05) + vec3(0.00, 0.05, 0.08);
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
