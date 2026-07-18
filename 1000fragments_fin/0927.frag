uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.25 + t * 1.17) - 0.5) * 2.0;
    v = sin((p.y * 4.13 + zx * 0.70 + t * 1.27) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.36;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.57 / 3.1415927, 1.12 / r - (time * 0.86) * 2.40);
	float d = field(tv, (time * 0.86), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.002, 0.062, 0.116), vec3(0.107, 0.401, 0.768), smoothstep(0.0, 0.45, cc)), vec3(0.833, 0.944, 1.000), smoothstep(0.45, 1.0, cc));
	col *= clamp(r * 1.14, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(1.014, 1.015, 1.011);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
