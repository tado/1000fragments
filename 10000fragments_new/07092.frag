uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.011, 0.048, 0.049);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.81 + 4.32) + vec2(fl * 7.31, -time * 2.04 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.87;
		float pd = length((gv - off) * vec2(8.58, 1.0));
		float tw = 0.63 + 0.23 * sin(time * 2.63 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.33, 1.00, 0.54), vec3(0.59, 0.73, 0.25), hash21(id + 7.0));
		col += tint * smoothstep(0.08, 0.0, pd) * tw / fl;
	}
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 2.04 + time * 9.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
