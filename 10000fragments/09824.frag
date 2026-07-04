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
	vec3 col = vec3(0.028, 0.000, 0.060);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.62 + 4.31) + vec2(fl * 7.31, -time * 2.99 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.71;
		float pd = length((gv - off) * vec2(6.41, 1.0));
		float tw = 0.66 + 0.18 * sin(time * 5.94 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.29, 0.26, 0.88), vec3(0.68, 0.66, 0.75), hash21(id + 7.0));
		col += tint * smoothstep(0.13, 0.0, pd) * tw / fl;
	}
	col = fract(col * 2.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
