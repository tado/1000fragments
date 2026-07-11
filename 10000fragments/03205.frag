uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.01 + vec2(t * 1.98, -t * 1.98) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.09;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.49), field(p, time, 0.97));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
