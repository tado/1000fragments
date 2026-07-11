uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.74 + t * 3.54 + ph) + sin(p.y * 14.94 - t * 2.87 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.73;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.72 / 3.1415927, 1.15 / r + (time * 0.79) * 1.60);
	float d = field(tv, (time * 0.79), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.00, 0.05, 0.05), vec3(0.55, 0.58, 0.61), cc);
	col *= clamp(r * 2.78, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.06 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col = clamp(col, 0.0, 1.0) * vec3(0.913, 0.970, 1.024) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
