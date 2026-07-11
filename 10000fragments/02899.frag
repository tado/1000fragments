uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.99 + vec2(t * 1.44, -t * 1.44) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.21, length(p) * 2.89 - time * 0.69); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.08, 0.33, 0.35), vec3(0.79, 0.51, 0.83), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
