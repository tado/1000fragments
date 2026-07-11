uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.43, t * 1.65 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.48;
	p = fract(p * 1.17) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.05, 0.49, 0.44), vec3(0.64, 0.79, 0.69), d);
	col *= 0.86 + 0.11 * sin(gl_FragCoord.y * 1.83 + time * 11.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
