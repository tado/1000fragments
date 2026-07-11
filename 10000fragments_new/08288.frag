uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.96, t * 2.05 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	{ p = vec2(atan(p.y, p.x) * 1.38, length(p) * 3.18 - time * 0.43); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.33), field(p, time, 0.66));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
