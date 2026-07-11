uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.01 + (time * 0.68) * 0.65) * 0.18;
	p.x *= resolution.x / resolution.y;
	p *= 0.95;
	vec3 col = vec3(0.040, 0.025, 0.041);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 0.90 + 3.37) + vec2((time * 0.68) * 0.16, (time * 0.68) * 0.17) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.67;
		float pd = length(gv - off);
		float tw = 0.76 + 0.18 * sin((time * 0.68) * 2.52 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.45, 0.47, 0.72), vec3(1.00, 0.74, 0.47), hash21(id + 7.0));
		col += tint * smoothstep(0.15, 0.0, pd) * tw / fl;
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col = clamp(col, 0.0, 1.0) * vec3(1.056, 1.004, 0.919) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
