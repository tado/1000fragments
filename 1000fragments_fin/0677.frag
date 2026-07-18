uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.14 + (time * 0.75) * 0.70) * 0.09;
	p *= 0.77;
	p.x *= resolution.x / resolution.y;
	vec3 col = mix(vec3(0.048, 0.055, 0.056), vec3(0.075, 0.084, 0.085), clamp(0.5 + p.y * 0.11 + p.x * 0.14, 0.0, 1.0));
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 0.81 + 3.30) + vec2((time * 0.75) * -0.37, (time * 0.75) * -0.32) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.66;
		float pd = length(gv - off);
		float tw = 0.73 + 0.35 * sin((time * 0.75) * 4.77 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.73, 0.45, 0.31), vec3(0.84, 0.43, 0.99), hash21(id + 7.0));
		col += tint * smoothstep(0.14, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.937, 0.992, 1.058);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.22 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
