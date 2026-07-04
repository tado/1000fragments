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
	p *= 1.44;
	vec3 col = vec3(0.006, 0.029, 0.063);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2(time * -0.25 * fl) * p * (fl * 1.02 + 3.78) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.78;
		float pd = length(gv - off);
		float tw = 0.72 + 0.26 * sin(time * 5.52 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.61, 0.26, 0.86), vec3(0.42, 0.60, 0.91), hash21(id + 7.0));
		col += tint * smoothstep(0.15, 0.0, pd) * tw / fl;
	}
	col = fract(col * 1.58);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
