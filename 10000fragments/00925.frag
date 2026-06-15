uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.18 + vec2(t * 1.75, -t * 1.75) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 1.67, length(p) * 4.91 - time * 0.59); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.28), field(p, time, 2.56));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.34, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
