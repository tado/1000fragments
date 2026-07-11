uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.61;
	p.x = abs(p.x) - 0.23;
	vec2 q = p * 2.36 + vec2(7.07, 8.76);
	q += (time * 0.79) * vec2(-0.09, -0.03);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 4.89) > 0.79) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 6.20);
	float ftn = 0.5 + 0.5 * sin((time * 0.79) * 1.35 + h * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.57, 0.56, 0.48) + vec3(0.00, 0.02, 0.07);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.421, 0.436, bd);
	col = mix(col, vec3(0.02, 0.08, 0.11), edge * 0.71);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(0.945, 0.977, 1.050) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
