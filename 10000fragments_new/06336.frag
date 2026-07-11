uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.34, t * 1.74 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	p = (floor(p * 23.4) + 0.5) / 23.4;
	{ p = vec2(atan(p.y, p.x) * 1.09, length(p) * 4.87 - time * 0.72); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.36, 1.14, 0.75) + vec3(0.30, 0.05, 0.02);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
