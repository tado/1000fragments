uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.86 + vec2(t * 1.40, -t * 1.45) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -1.31 + time * 0.24) * p;
	p = rot2(length(p) * 2.74 + time * 0.84) * p;
	p = rot2(time * -0.63) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.21), field(p, time, 2.43));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
