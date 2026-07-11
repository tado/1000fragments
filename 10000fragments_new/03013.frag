uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.024, 0.033, 0.008);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.00 + 3.83) + vec2(fl * 7.31, -time * 1.04 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.85;
		float pd = length((gv - off) * vec2(4.95, 1.0));
		float tw = 0.81 + 0.28 * sin(time * 4.35 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.98, 0.76, 0.42), vec3(0.88, 0.46, 0.77), hash21(id + 7.0));
		col += tint * smoothstep(0.11, 0.0, pd) * tw / fl;
	}
	col *= 0.90 + 0.19 * sin(gl_FragCoord.y * 1.10 + time * 9.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
