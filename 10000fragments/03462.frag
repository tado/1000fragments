uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.005, 0.028, 0.028);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.88 + 1.85) + vec2(time * -0.17, time * 0.30) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.51;
		float pd = length(gv - off);
		float tw = 0.75 + 0.30 * sin(time * 2.42 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.68, 0.89, 0.66), vec3(0.36, 0.32, 0.48), hash21(id + 7.0));
		col += tint * smoothstep(0.08, 0.0, pd) * tw / fl;
	}
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.91 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
