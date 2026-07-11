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
	p *= 1.05;
	vec3 col = vec3(0.044, 0.048, 0.012);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2((time * 0.70) * -0.30 * fl) * p * (fl * 0.98 + 2.33) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.65;
		float pd = length(gv - off);
		float tw = 0.63 + 0.37 * sin((time * 0.70) * 5.19 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.70, 0.44, 0.83), vec3(0.81, 0.66, 0.23), hash21(id + 7.0));
		col += tint * smoothstep(0.09, 0.0, pd) * tw / fl;
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.990, 0.993, 1.018) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
