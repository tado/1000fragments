uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 1.59 + vec2(3.26, 5.22);
	q += (time * 0.57) * vec2(0.09, -0.06);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 6.27) > 0.56) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 8.73);
	float ftn = clamp(0.5 + gv.x * 0.71 + gv.y * 1.24, 0.0, 1.0) * (0.35 + 0.65 * h);
	vec3 col = vec3(0.877, 0.323, 0.271) * (0.13 / (abs(((ftn * 2.0 - 1.0))) + 0.09));
	col = col / (1.0 + col);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.455, 0.470, bd);
	col = mix(col, vec3(0.81, 0.66, 0.81), edge * 0.90);
	col = clamp((col - 0.5) * 1.68 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(1.014, 0.981, 0.953);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
