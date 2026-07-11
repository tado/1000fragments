uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.66 + vec2(t * 2.10, -t * 2.10) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	p += vec2(0.48, 0.30) * sin(length(p) * 2.48 - time * 1.91) * 0.16;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.65), field(p, time, 1.31));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
