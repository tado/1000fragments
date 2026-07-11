uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	vec3 col = vec3(0.042, 0.047, 0.071);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.18 + 3.09) + vec2(fl * 7.31, -(time * 0.53) * 3.22 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.54;
		float pd = length((gv - off) * vec2(4.73, 1.0));
		float tw = 0.61 + 0.29 * sin((time * 0.53) * 5.53 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.55, 0.36, 0.91), vec3(0.31, 0.63, 0.48), hash21(id + 7.0));
		col += tint * smoothstep(0.10, 0.0, pd) * tw / fl;
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.982, 1.015, 1.008) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
