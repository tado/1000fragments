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
	p *= 2.62;
	vec3 col = vec3(0.024, 0.047, 0.000);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.79 + 2.26) + vec2(fl * 7.31, -time * 2.58 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.67;
		float pd = length((gv - off) * vec2(6.39, 1.0));
		float tw = 0.63 + 0.27 * sin(time * 2.51 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.36, 0.80, 0.78), vec3(0.36, 0.26, 0.79), hash21(id + 7.0));
		col += tint * smoothstep(0.09, 0.0, pd) * tw / fl;
	}
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 1.30 + time * 10.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
