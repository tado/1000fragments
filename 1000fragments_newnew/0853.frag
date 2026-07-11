uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.32 * pow(abs(cos(ra * 2.0 + t * 2.66)), 1.69);
    v = sin((rr - pet) * 9.07 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.69) * 0.21;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.35 / 3.1415927, 1.45 / r + (time * 0.69) * 2.67);
	float d = field(tv, (time * 0.69), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.08, 0.06), vec3(0.67, 0.64, 0.66), cc);
	col *= clamp(r * 1.04, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.27 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 0.943, 1.029) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
