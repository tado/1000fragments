uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.30, t * 0.49 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.78;
	p = rot2(1.18) * p;
	{ p = vec2(atan(p.y, p.x) * 2.38, length(p) * 2.44 - time * 0.43); }
	p *= 1.48;
	p = rot2(length(p) * 2.47 + time * 0.93) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.89), field(p, time, 1.79));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.19 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
