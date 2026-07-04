uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.50;
	vec3 col = vec3(0.020, 0.037, 0.026);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.77 + 2.81) + vec2(fl * 7.31, -time * 2.26 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.58;
		float pd = length((gv - off) * vec2(6.08, 1.0));
		float tw = 0.65 + 0.23 * sin(time * 3.11 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.24, 0.69, 0.33), vec3(0.29, 0.89, 0.87), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.69 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
