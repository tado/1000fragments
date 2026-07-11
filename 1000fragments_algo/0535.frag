uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p.x = abs(p.x);
	p *= 2.45;
	vec2 q = p * 3.31 + vec2(3.37, 0.11);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 2.38) > 0.73) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.96);
	float ftn = 0.5 + 0.5 * sin((time * 0.78) * 0.87 + h * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.61, 0.69, 0.57) + vec3(0.06, 0.11, 0.04);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.410, 0.425, bd);
	col = mix(col, vec3(0.10, 0.11, 0.10), edge * 0.91);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(1.017, 0.956, 1.020) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
