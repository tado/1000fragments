uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.72 + sin(p.y * 3.59 + t * 4.31) * 4.16 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.40 + (time * 0.82) * 1.14) * 0.18;
	float an = atan(p.y, p.x) + (time * 0.82) * -0.69;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.09 / 3.1415927, 0.66 / r - (time * 0.82) * 2.84);
	float d = field(tv, (time * 0.82), 0.0);
	vec3 col = vec3(0.45, 0.36, 0.32) * (0.07 / (abs((d)) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 1.72, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.85 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.013, 0.961, 1.023) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
