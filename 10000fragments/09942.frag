uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.72 + vec2(t * 0.30, -t * 0.31) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.38), field(p, time, 2.75));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
