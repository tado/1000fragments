uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * 0.70;
	p.x *= resolution.x / resolution.y;
	p *= 2.55;
	vec3 col = mix(vec3(0.028, 0.068, 0.060), vec3(0.020, 0.075, 0.041), clamp(0.5 + p.y * -0.46 + p.x * -0.09, 0.0, 1.0));
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.96 + 3.07) + vec2((time * 0.70) * 0.44, (time * 0.70) * -0.26) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.73;
		float pd = length(gv - off);
		float tw = 0.65 + 0.33 * sin((time * 0.70) * 1.89 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.45, 0.63, 1.00), vec3(0.42, 0.84, 0.93), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(1.57));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.988, 1.025, 0.954);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
