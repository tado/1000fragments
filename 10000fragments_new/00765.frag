uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.52;
	vec3 col = vec3(0.011, 0.020, 0.038);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2(time * -0.06 * fl) * p * (fl * 1.61 + 2.59) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.71;
		float pd = length(gv - off);
		float tw = 0.65 + 0.35 * sin(time * 5.17 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.65, 0.47, 0.47), vec3(0.42, 0.74, 0.58), hash21(id + 7.0));
		col += tint * smoothstep(0.12, 0.0, pd) * tw / fl;
	}
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 2.47 + time * 4.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
