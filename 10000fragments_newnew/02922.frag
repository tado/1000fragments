uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.37 - t * 1.99 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.82;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.85, 1.30, 1.43) + vec3(0.07, 0.04, 0.00);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
