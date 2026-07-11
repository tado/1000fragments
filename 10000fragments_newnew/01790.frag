uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.029, 0.049, 0.028);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.16 + 4.82) + vec2(fl * 7.31, -time * 3.97 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.82;
		float pd = length((gv - off) * vec2(7.14, 1.0));
		float tw = 0.70 + 0.20 * sin(time * 5.31 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.47, 0.23, 0.47), vec3(0.65, 0.87, 0.21), hash21(id + 7.0));
		col += tint * smoothstep(0.18, 0.0, pd) * tw / fl;
	}
	col *= 0.81 + 0.14 * sin(gl_FragCoord.y * 0.88 + time * 6.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
