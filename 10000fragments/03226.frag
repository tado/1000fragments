uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.55 + vec2(t * 1.69, -t * 1.69) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.43;
	p = abs(p);
	p += vec2(-0.33, 0.30) * sin(length(p) * 2.50 - time * 1.23) * 0.33;
	{ p = vec2(atan(p.y, p.x) * 2.93, length(p) * 5.92 - time * 0.54); }
	p = rot2(p.y * -3.74 + time * 0.92) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.35), field(p, time, 0.69));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
