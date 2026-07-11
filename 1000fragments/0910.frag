uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.31 + vec2(t * 2.76, -t * 2.76) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(0.69) * p;
	p += vec2(0.63, 0.73) * sin(length(p) * 4.16 - time * 0.96) * 0.38;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.58, 0.85, 1.14) + vec3(0.24, 0.02, 0.25);
	col = fract(col * 2.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
