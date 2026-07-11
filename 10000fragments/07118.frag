uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.04, t * 1.96 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	{ p = vec2(atan(p.y, p.x) * 2.07, length(p) * 2.95 - time * 0.77); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.30), field(p, time, 2.61));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
