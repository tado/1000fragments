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
	vec3 col = vec3(0.038, 0.012, 0.053);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 0.83 + 4.53) + vec2(fl * 7.31, -time * 3.58 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.70;
		float pd = length((gv - off) * vec2(5.72, 1.0));
		float tw = 0.67 + 0.38 * sin(time * 2.48 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.98, 0.59, 0.89), vec3(0.53, 0.45, 0.52), hash21(id + 7.0));
		col += tint * smoothstep(0.18, 0.0, pd) * tw / fl;
	}
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
