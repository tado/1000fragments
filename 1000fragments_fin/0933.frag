uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.16 * pow(abs(cos(ra * 4.0 + t * 2.40)), 2.96);
    v = sin((rr - pet) * 20.61 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.53 / 3.1415927, 1.31 / r - (time * 0.80) * 1.18);
	float d = field(tv, (time * 0.80), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.045, 0.098, 0.118), vec3(0.142, 0.590, 0.474), smoothstep(0.0, 0.52, cc)), vec3(0.959, 0.936, 0.906), smoothstep(0.52, 1.0, cc));
	col *= clamp(r * 1.42, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.029, 0.981, 0.943);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
