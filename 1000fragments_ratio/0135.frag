uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.37, t * 2.26 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.66) * 0.90), cos((time * 0.66) * 0.78)) * 0.24;
	p *= 1.13;
	{ p = vec2(atan(p.y, p.x) * 1.02, length(p) * 2.57 - (time * 0.66) * 0.41); }
	float d = 0.5 + 0.5 * field(p, (time * 0.66), 0.0);
	vec3 col = mix(vec3(0.02, 0.06, 0.07), vec3(0.70, 0.58, 0.58), d);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col = clamp(col, 0.0, 1.0) * vec3(1.033, 0.972, 0.928) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
