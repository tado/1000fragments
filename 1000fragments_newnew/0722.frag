uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.31 + 0.32 * pow(abs(cos(ra * 2.0 + t * 1.02)), 0.54);
    v = sin((rr - pet) * 15.71 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.81) * 0.48), cos((time * 0.81) * 0.52)) * 0.29;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.66 / 3.1415927, 1.25 / r + (time * 0.81) * 2.49);
	float d = field(tv, (time * 0.81), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.77, 0.60, 0.59), vec3(0.05, 0.01, 0.02), cc);
	col *= clamp(r * 1.95, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.943, 0.970, 1.043) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
