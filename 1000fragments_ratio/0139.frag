uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.34 + sin(p.y * 2.79 + t * 2.72) * 1.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p = abs(p) - 0.71;
	p = rot2((time * 0.80) * -0.71) * p;
	p += vec2(0.45, 0.66) * sin(length(p) * 5.19 - (time * 0.80) * 1.01) * 0.15;
	float d = 0.5 + 0.5 * field(p, (time * 0.80), 0.0);
	vec3 col = mix(vec3(0.11, 0.11, 0.14), vec3(0.75, 0.64, 0.78), d);
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 0.93 + (time * 0.80) * 6.64);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col = clamp(col, 0.0, 1.0) * vec3(1.011, 0.952, 1.027) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
