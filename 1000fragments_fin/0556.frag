uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p += vec2(sin((time * 0.56) * 0.46), cos((time * 0.56) * 0.39)) * 0.05;
	p.x *= resolution.x / resolution.y;
	p *= 1.29;
	vec2 q = p * 1.62 + vec2(5.75, 7.47);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 3.59) > 0.69) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 4.18);
	float ftn = 0.5 + 0.5 * sin((time * 0.56) * 1.28 + h * 6.2831853);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.666, 0.938, 0.807), vec3(0.134, 0.066, 0.146), cc);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.414, 0.429, bd);
	col = mix(col, vec3(0.76, 0.75, 0.78), edge * 0.92);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.963, 0.998, 0.932);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
