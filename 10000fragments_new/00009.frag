uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.15, t * 1.98 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.29;
	{ p = vec2(atan(p.y, p.x) * 1.62, length(p) * 4.93 - time * 0.89); }
	p += vec2(0.19, -0.70) * sin(length(p) * 4.33 - time * 1.54) * 0.34;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.35), field(p, time, 2.71));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.44 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
