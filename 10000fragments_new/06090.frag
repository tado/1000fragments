uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.44 - t * 2.37 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	{ p = vec2(atan(p.y, p.x) * 1.58, length(p) * 3.72 - time * 0.41); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.37, 0.05, 0.01), vec3(0.84, 0.90, 0.99), d);
	col *= 0.83 + 0.18 * sin(gl_FragCoord.y * 2.65 + time * 15.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
