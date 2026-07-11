uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.93, t * 2.21 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.37;
	{ p = vec2(atan(p.y, p.x) * 2.18, length(p) * 2.85 - time * 0.29); }
	p = rot2(length(p) * 1.99 + time * 0.62) * p;
	p = rot2(p.y * 1.55 + time * 0.22) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.88), field(p, time, 1.77));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
