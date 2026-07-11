uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.79, t * 1.59 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.72) * 0.79), cos((time * 0.72) * 0.47)) * 0.15;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.08 / 3.1415927, 0.88 / r + (time * 0.72) * 2.19);
	tv.x += tv.y * 0.43;
	float d = field(tv, (time * 0.72), 0.0);
	vec3 col = vec3(0.36, 0.45, 0.49) * (0.10 / (abs((d)) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 1.36, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.46 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(1.040, 0.985, 0.914) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
