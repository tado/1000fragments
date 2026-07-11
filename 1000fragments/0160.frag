uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.35 + vec2(t * 2.92, -t * 2.92) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	p = rot2(length(p) * 1.04 + time * 0.75) * p;
	p = fract(p * 2.64) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.40), field(p, time, 0.81));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
