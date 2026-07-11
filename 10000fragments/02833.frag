uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.01 + vec2(t * 1.89, -t * 1.89) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 1.85) - 0.5;
	p += vec2(-0.38, -0.81) * sin(length(p) * 4.66 - time * 1.29) * 0.26;
	p = rot2(length(p) * 1.64 + time * 0.73) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.34), field(p, time, 2.69));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
