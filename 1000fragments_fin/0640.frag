uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 0.86;
	p.x *= resolution.x / resolution.y;
	p *= 1.42;
	vec3 col = mix(vec3(0.052, 0.043, 0.058), vec3(0.067, 0.042, 0.057), clamp(0.5 + p.y * 0.59 + p.x * -0.26, 0.0, 1.0));
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.85 + 2.25) + vec2((time * 0.63) * 0.53, (time * 0.63) * 0.14) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.85;
		float pd = length(gv - off);
		float tw = 0.82 + 0.26 * sin((time * 0.63) * 5.72 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.88, 0.95, 0.58), vec3(0.89, 1.00, 0.91), hash21(id + 7.0));
		col += tint * smoothstep(0.18, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(0.922, 0.977, 1.039);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
