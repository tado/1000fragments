uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.009, 0.015, 0.021);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.29 + 4.17) + vec2(fl * 7.31, -(time * 0.80) * 2.07 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.73;
		float pd = length((gv - off) * vec2(5.13, 1.0));
		float tw = 0.62 + 0.25 * sin((time * 0.80) * 3.14 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.58, 0.68, 0.91), vec3(0.21, 0.58, 0.71), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(0.979, 1.021, 0.945);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
