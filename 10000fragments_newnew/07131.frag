uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.23 + vec2(t * 0.74, -t * 1.58) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.33;
	p = (floor(p * 19.7) + 0.5) / 19.7;
	p += vec2(-0.70, -0.74) * sin(length(p) * 3.72 - time * 2.11) * 0.18;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.64, 0.60, 0.96) * (0.15 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
