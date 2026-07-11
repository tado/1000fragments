uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.12 - t * 7.23 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	p *= 2.88;
	{ p = vec2(atan(p.y, p.x) * 1.72, length(p) * 2.71 - time * 0.83); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.15, 0.93, 0.22) * (0.20 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
