uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.45;
	vec3 col = vec3(0.034, 0.000, 0.065);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 0.99 + 1.95) + vec2(time * -0.47, time * -0.24) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.90;
		float pd = length(gv - off);
		float tw = 0.64 + 0.19 * sin(time * 4.00 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.78, 0.50, 0.55), vec3(0.96, 0.45, 0.42), hash21(id + 7.0));
		col += tint * smoothstep(0.17, 0.0, pd) * tw / fl;
	}
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.06 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
