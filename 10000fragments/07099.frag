uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.61 - t * 8.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.68) * p;
	p = rot2(p.y * 2.80 + time * 0.62) * p;
	{ p = vec2(atan(p.y, p.x) * 2.84, length(p) * 3.95 - time * 0.63); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.08), field(p, time, 2.17));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.31 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
