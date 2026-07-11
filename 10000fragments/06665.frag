uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.87, t * 1.02 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	p += vec2(-0.12, 0.19) * sin(length(p) * 4.64 - time * 0.71) * 0.28;
	{ float fr = length(p); p *= 1.0 + -0.31 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.22, 0.24, 0.32), vec3(0.84, 0.57, 0.77), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
