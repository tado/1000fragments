uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.89 + vec2(t * 2.10, -t * 2.10) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	p = rot2(length(p) * -1.26 + time * 0.22) * p;
	{ p = vec2(atan(p.y, p.x) * 1.21, length(p) * 4.91 - time * 0.71); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.36), field(p, time, 0.72));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
