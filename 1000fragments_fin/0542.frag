uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.10;
	p += vec2(sin((time * 0.79) * 0.69), cos((time * 0.79) * 0.47)) * 0.18;
	p.x *= resolution.x / resolution.y;
	p *= 1.80;
	vec2 q = p * 2.19 + vec2(4.97, 6.45);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 2.58) > 0.56) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 4.54);
	float ftn = 0.5 + 0.5 * sin((time * 0.79) * 2.08 + h * 6.2831853);
	vec3 col = vec3(0.190, 0.219, 0.482) * (0.12 / (abs(((ftn * 2.0 - 1.0))) + 0.09));
	col = col / (1.0 + col);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.458, 0.473, bd);
	col = mix(col, vec3(0.69, 0.58, 0.63), edge * 0.80);
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.029, 0.956, 1.018);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
