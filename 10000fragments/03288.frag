uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.28) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 2.63 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.49, length(p) * 5.79 - time * 0.12); }
	p *= 1.68;
	p = fract(p * 1.01) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.55, 0.83, 1.01) + vec3(0.11, 0.17, 0.08);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
