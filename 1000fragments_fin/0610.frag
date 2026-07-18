uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 1.87;
	vec2 z = p;
	vec2 c = vec2(-0.25 + 0.11 * sin((time * 0.73) * 1.58), 0.06 + 0.19 * cos((time * 0.73) * 1.36));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.08, -0.44)));
	}
	float v = exp(-trap * 4.85);
	float cc = clamp(0.5 + 0.5 * (v * 3.94), 0.0, 1.0);
	vec3 col = mix(vec3(0.030, 0.055, 0.107), vec3(0.901, 0.923, 0.874), cc);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.941, 0.986, 1.045);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
