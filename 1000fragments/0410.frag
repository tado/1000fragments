uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.52 + vec2(t * 1.22, -t * 1.22) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	p = rot2(0.52) * p;
	p *= 2.25;
	p = rot2(time * 0.77) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.39), field(p, time, 0.77));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
