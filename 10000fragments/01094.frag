uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.57;
	vec3 col = vec3(0.024, 0.017, 0.008);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.43 + 3.93) + vec2(fl * 7.31, -time * 2.00 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.67;
		float pd = length((gv - off) * vec2(4.36, 1.0));
		float tw = 0.72 + 0.34 * sin(time * 3.04 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.43, 0.45, 0.48), vec3(0.73, 0.44, 0.24), hash21(id + 7.0));
		col += tint * smoothstep(0.08, 0.0, pd) * tw / fl;
	}
	col = mod(col * 2.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
