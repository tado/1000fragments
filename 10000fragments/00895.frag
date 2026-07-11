uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.42 + sin(p.y * 3.52 + t * 2.22) * 3.89 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.18, 0.39, 0.08), vec3(0.72, 0.62, 0.97), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
