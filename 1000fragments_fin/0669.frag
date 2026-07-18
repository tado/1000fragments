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
	p *= 2.64;
	vec3 col = mix(vec3(0.052, 0.048, 0.092), vec3(0.036, 0.059, 0.114), clamp(0.5 + p.y * -0.17 + p.x * 0.28, 0.0, 1.0));
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.01 + 3.16) + vec2((time * 0.60) * -0.19, (time * 0.60) * -0.21) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.77;
		float pd = length(gv - off);
		float tw = 0.78 + 0.34 * sin((time * 0.60) * 1.53 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.52, 0.31, 0.51), vec3(0.93, 0.97, 0.91), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	col *= 0.85 + 0.11 * sin(gl_FragCoord.y * 1.32 + (time * 0.60) * 17.83);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.012, 0.966, 0.999);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
