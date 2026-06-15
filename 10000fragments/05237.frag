uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.97, t * 0.81 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.19;
	{ float fr = length(p); p *= 1.0 + -0.77 * fr * fr; }
	p = fract(p * 2.99) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.71, length(p) * 5.58 - time * 0.15); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.08), field(p, time, 2.15));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
