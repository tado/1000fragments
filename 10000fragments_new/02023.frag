uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.08 + vec2(t * 1.35, -t * 1.70) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.20, 0.86, 0.78) * (0.18 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = fract(col * 2.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
