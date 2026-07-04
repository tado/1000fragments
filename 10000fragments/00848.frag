uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	vec3 col = vec3(0.042, 0.036, 0.016);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.40 + 2.28) + vec2(fl * 7.31, -time * 1.09 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.78;
		float pd = length((gv - off) * vec2(8.44, 1.0));
		float tw = 0.64 + 0.31 * sin(time * 1.86 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.72, 0.47, 0.33), vec3(0.61, 0.55, 0.21), hash21(id + 7.0));
		col += tint * smoothstep(0.05, 0.0, pd) * tw / fl;
	}
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.80 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
