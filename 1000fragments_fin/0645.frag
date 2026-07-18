uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	vec3 col = mix(vec3(0.051, 0.040, 0.062), vec3(0.034, 0.074, 0.076), clamp(0.5 + p.y * -0.28 + p.x * 0.27, 0.0, 1.0));
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 0.93 + 4.41) + vec2(fl * 7.31, -(time * 0.63) * 1.44 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.60;
		float pd = length((gv - off) * vec2(7.43, 1.0));
		float tw = 0.82 + 0.21 * sin((time * 0.63) * 2.01 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.59, 0.22, 0.64), vec3(0.47, 0.84, 0.57), hash21(id + 7.0));
		col += tint * smoothstep(0.12, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(0.995, 1.000, 0.991);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
