uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.015, 0.003, 0.032);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.35 + 2.83) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.51;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin(time * 6.16 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.84, 0.74, 0.70), vec3(0.67, 0.41, 0.64), hash21(id + 7.0));
		col += tint * smoothstep(0.11, 0.0, pd) * tw / fl;
	}
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
