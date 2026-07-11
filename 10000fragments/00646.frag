uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.66 + sin(p.y * 3.19 + t * 4.34) * 2.06 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.31;
	{ p = vec2(atan(p.y, p.x) * 1.86, length(p) * 2.29 - time * 0.73); }
	p = rot2(length(p) * 1.64 + time * 0.83) * p;
	p = fract(p * 1.26) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.78), field(p, time, 1.55));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
