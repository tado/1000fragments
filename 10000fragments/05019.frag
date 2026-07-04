uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.003, 0.027, 0.066);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.81 + 3.01) + vec2(fl * 7.31, -time * 1.29 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.54;
		float pd = length((gv - off) * vec2(4.34, 1.0));
		float tw = 0.61 + 0.31 * sin(time * 2.70 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.24, 0.76, 0.29), vec3(0.90, 0.65, 0.93), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
