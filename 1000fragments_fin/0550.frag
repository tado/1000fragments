uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * -0.48;
	p *= 2.44;
	vec2 q = p * 3.15 + vec2(4.34, 4.48);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 0.48) > 0.59) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 3.79);
	float rr = 0.27 + 0.09 * sin((time * 0.56) * 1.79 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.085, 0.080, 0.047), vec3(0.711, 0.307, 0.172), smoothstep(0.0, 0.59, cc)), vec3(1.000, 0.806, 0.618), smoothstep(0.59, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.463, 0.478, bd);
	col = mix(col, vec3(0.08, 0.05, 0.09), edge * 0.86);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.53));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.013, 1.010, 1.011);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
