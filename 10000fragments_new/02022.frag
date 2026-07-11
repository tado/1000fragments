uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.66 + vec2(t * 2.40, -t * 2.85) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += sin(p.y * 2.72 + time * 3.71) * 0.31;
	p = fract(p * 2.58) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.56, 0.71, 1.48) + vec3(0.08, 0.28, 0.07);
	col = mod(col * 2.45, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
