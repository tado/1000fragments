uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.85) * 0.48), cos((time * 0.85) * 0.92)) * 0.08;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= 2.46;
	vec3 col = vec3(0.002, 0.002, 0.041);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.24 + 1.77) + vec2((time * 0.85) * 0.12, (time * 0.85) * -0.52) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.52;
		float pd = length(gv - off);
		float tw = 0.62 + 0.20 * sin((time * 0.85) * 4.00 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.44, 0.75, 0.66), vec3(0.50, 0.48, 0.24), hash21(id + 7.0));
		col += tint * smoothstep(0.17, 0.0, pd) * tw / fl;
	}
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(1.058, 0.971, 0.912) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
