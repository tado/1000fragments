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
	vec3 col = vec3(0.038, 0.029, 0.073);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.60 + 2.14) + vec2(fl * 7.31, -time * 3.05 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.60;
		float pd = length((gv - off) * vec2(6.57, 1.0));
		float tw = 0.84 + 0.35 * sin(time * 3.40 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.93, 0.47, 0.97), vec3(0.24, 0.86, 0.43), hash21(id + 7.0));
		col += tint * smoothstep(0.18, 0.0, pd) * tw / fl;
	}
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
