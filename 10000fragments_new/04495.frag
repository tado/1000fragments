uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.00 + vec2(t * 0.70, -t * 2.22) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.49;
	p = rot2(time * -0.65) * p;
	p += vec2(0.04, -0.03) * sin(length(p) * 5.54 - time * 2.30) * 0.20;
	p = fract(p * 1.17) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.20, 0.31, 0.15) * (0.23 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 1.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
