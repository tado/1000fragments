uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p += vec2(sin((time * 0.50) * 0.69), cos((time * 0.50) * 0.71)) * 0.23;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.026, 0.011, 0.003);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.26 + 2.11) + vec2(fl * 7.31, -(time * 0.50) * 3.95 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.53;
		float pd = length((gv - off) * vec2(4.64, 1.0));
		float tw = 0.77 + 0.35 * sin((time * 0.50) * 3.29 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.55, 0.57, 0.47), vec3(0.36, 0.99, 0.83), hash21(id + 7.0));
		col += tint * smoothstep(0.10, 0.0, pd) * tw / fl;
	}
	col *= 0.82 + 0.11 * sin(gl_FragCoord.y * 1.37 + (time * 0.50) * 11.69);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(1.000, 0.992, 1.016) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
