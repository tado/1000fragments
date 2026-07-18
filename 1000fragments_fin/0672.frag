uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.75;
	p *= 1.60;
	vec3 col = mix(vec3(0.049, 0.040, 0.063), vec3(0.077, 0.051, 0.077), clamp(0.5 + p.y * 0.25 + p.x * 0.20, 0.0, 1.0));
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.53 + 2.04) + vec2((time * 0.63) * 0.27, (time * 0.63) * 0.25) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.86;
		float pd = length(gv - off);
		float tw = 0.80 + 0.40 * sin((time * 0.63) * 3.59 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.42, 0.66, 0.50), vec3(0.40, 0.55, 0.70), hash21(id + 7.0));
		col += tint * smoothstep(0.12, 0.0, pd) * tw / fl;
	}
	col *= 0.81 + 0.12 * sin(gl_FragCoord.y * 1.14 + (time * 0.63) * 4.05);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.000, 1.011, 1.010);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
