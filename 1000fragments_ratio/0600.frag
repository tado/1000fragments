uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x);
	vec3 col = vec3(0.025, 0.044, 0.014);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.51 + 4.88) + vec2(fl * 7.31, -(time * 0.70) * 2.55 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.84;
		float pd = length((gv - off) * vec2(7.95, 1.0));
		float tw = 0.68 + 0.35 * sin((time * 0.70) * 2.61 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.90, 0.87, 0.90), vec3(0.31, 0.76, 0.71), hash21(id + 7.0));
		col += tint * smoothstep(0.06, 0.0, pd) * tw / fl;
	}
	col *= 0.89 + 0.17 * sin(gl_FragCoord.y * 2.35 + (time * 0.70) * 7.05);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.966, 1.017, 0.934) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
