uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.30 + sin(p.y * 5.15 + t * 5.00) * 2.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.34) * p;
	{ p = vec2(atan(p.y, p.x) * 2.33, length(p) * 4.89 - time * 0.55); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.11), field(p, time, 2.21));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
