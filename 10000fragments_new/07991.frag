uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.47 + vec2(t * 1.31, -t * 0.76) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 1.53 + time * 0.60) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.18, 0.05, 0.16), vec3(0.99, 0.61, 0.42), d);
	col *= 0.86 + 0.15 * sin(gl_FragCoord.y * 2.10 + time * 6.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
