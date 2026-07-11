uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * -0.70;
	p.y += sin(p.x * 1.17 + (time * 0.73) * 0.54) * 0.18;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.024, 0.041, 0.036);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.95 + 2.13) + vec2((time * 0.73) * -0.20, (time * 0.73) * 0.43) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.60;
		float pd = length(gv - off);
		float tw = 0.72 + 0.17 * sin((time * 0.73) * 2.25 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.66, 0.26, 0.45), vec3(0.47, 0.66, 0.35), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col = clamp(col, 0.0, 1.0) * vec3(1.007, 0.963, 1.027) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
