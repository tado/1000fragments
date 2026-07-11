uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 9.36 - t * 8.96 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	p = fract(p * 2.06) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.24, length(p) * 2.98 - time * 0.26); }
	p += vec2(-0.89, 0.23) * sin(length(p) * 5.01 - time * 0.72) * 0.33;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.56, 0.98, 0.83) + vec3(0.05, 0.13, 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
