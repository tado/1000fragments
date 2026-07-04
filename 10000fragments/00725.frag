uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.94 + vec2(t * 2.86, -t * 1.94) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.33;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.02, 0.43, 0.28), vec3(0.58, 0.95, 0.62), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
