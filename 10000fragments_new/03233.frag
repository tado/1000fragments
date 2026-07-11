uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.15;
	vec3 col = vec3(0.041, 0.042, 0.028);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.90 + 4.32) + vec2(fl * 7.31, -time * 2.26 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.88;
		float pd = length((gv - off) * vec2(5.11, 1.0));
		float tw = 0.81 + 0.23 * sin(time * 4.73 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.77, 0.37, 0.84), vec3(0.46, 0.44, 0.94), hash21(id + 7.0));
		col += tint * smoothstep(0.08, 0.0, pd) * tw / fl;
	}
	col = mod(col * 1.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
