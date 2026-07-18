uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.04;
	p.x *= resolution.x / resolution.y;
	vec3 col = mix(vec3(0.056, 0.041, 0.050), vec3(0.024, 0.034, 0.035), clamp(0.5 + p.y * -0.03 + p.x * -0.14, 0.0, 1.0));
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.20 + 2.25) + vec2((time * 0.66) * 0.32, (time * 0.66) * -0.42) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.86;
		float pd = length(gv - off);
		float tw = 0.80 + 0.24 * sin((time * 0.66) * 1.81 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.29, 0.42, 0.27), vec3(0.31, 0.56, 0.41), hash21(id + 7.0));
		col += tint * smoothstep(0.12, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.010, 0.984, 0.955);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
