uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.044, 0.011, 0.056);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.20 + 2.19) + vec2(fl * 7.31, -time * 2.40 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.89;
		float pd = length((gv - off) * vec2(6.27, 1.0));
		float tw = 0.66 + 0.23 * sin(time * 2.13 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.48, 0.96, 0.33), vec3(0.79, 0.77, 0.75), hash21(id + 7.0));
		col += tint * smoothstep(0.10, 0.0, pd) * tw / fl;
	}
	col *= 0.87 + 0.17 * sin(gl_FragCoord.y * 2.28 + time * 13.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
