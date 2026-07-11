uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.31 + 0.31 * pow(abs(cos(ra * 6.0 + t * 2.08)), 2.96);
    v = sin((rr - pet) * 22.89 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.58 / 3.1415927, 1.38 / r - (time * 0.63) * 2.78);
	float d = field(tv, (time * 0.63), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.10, 0.31), vec3(0.50, 0.62, 0.64), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 2.97, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.81 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.978, 1.011, 0.953) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
