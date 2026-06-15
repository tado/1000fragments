uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.72, t * 1.85 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.47, 0.03) * sin(length(p) * 2.96 - time * 0.52) * 0.27;
	p = fract(p * 2.47) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.65 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.02), field(p, time, 2.05));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
