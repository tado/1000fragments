uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.05 + vec2(t * 2.32, -t * 2.32) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.15;
	{ p = vec2(atan(p.y, p.x) * 2.38, length(p) * 5.80 - time * 0.76); }
	p = rot2(time * -1.39) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.77), field(p, time, 1.55));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
