uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.82 + vec2(t * 1.84, -t * 2.17) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	{ p = vec2(atan(p.y, p.x) * 2.92, length(p) * 5.60 - time * 0.65); }
	p = rot2(time * -0.32) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.22), field(p, time, 0.43));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
