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
	vec3 col = vec3(0.001, 0.026, 0.044);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.99 + 3.77) + vec2(fl * 7.31, -time * 1.34 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.75;
		float pd = length((gv - off) * vec2(6.02, 1.0));
		float tw = 0.81 + 0.30 * sin(time * 4.46 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.31, 0.26, 0.38), vec3(0.64, 0.78, 0.57), hash21(id + 7.0));
		col += tint * smoothstep(0.18, 0.0, pd) * tw / fl;
	}
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
