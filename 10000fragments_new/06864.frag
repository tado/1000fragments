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
	p *= 2.65;
	vec3 col = vec3(0.024, 0.006, 0.037);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.78 + 4.39) + vec2(fl * 7.31, -time * 2.12 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.82;
		float pd = length((gv - off) * vec2(4.05, 1.0));
		float tw = 0.63 + 0.16 * sin(time * 2.54 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.54, 0.25, 0.47), vec3(0.92, 0.80, 0.66), hash21(id + 7.0));
		col += tint * smoothstep(0.15, 0.0, pd) * tw / fl;
	}
	col = fract(col * 2.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
