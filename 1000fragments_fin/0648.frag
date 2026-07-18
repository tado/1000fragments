uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.90 + (time * 0.59) * 1.18) * 0.13;
	vec3 col = mix(vec3(0.019, 0.044, 0.075), vec3(0.046, 0.052, 0.072), clamp(0.5 + p.y * -0.52 + p.x * 0.18, 0.0, 1.0));
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.46 + 4.59) + vec2(fl * 7.31, -(time * 0.59) * 3.24 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.80;
		float pd = length((gv - off) * vec2(8.31, 1.0));
		float tw = 0.65 + 0.17 * sin((time * 0.59) * 5.84 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.34, 0.59, 0.39), vec3(0.82, 0.84, 0.63), hash21(id + 7.0));
		col += tint * smoothstep(0.17, 0.0, pd) * tw / fl;
	}
	col = clamp((col - 0.5) * 1.28 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(1.003, 0.951, 1.009);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
