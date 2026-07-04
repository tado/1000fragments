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
	vec3 col = vec3(0.045, 0.039, 0.037);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2(time * 0.23 * fl) * p * (fl * 1.93 + 2.06) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.62;
		float pd = length(gv - off);
		float tw = 0.60 + 0.16 * sin(time * 4.35 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.43, 0.22, 0.35), vec3(0.50, 0.79, 0.54), hash21(id + 7.0));
		col += tint * smoothstep(0.07, 0.0, pd) * tw / fl;
	}
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.01 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
