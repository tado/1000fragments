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
	p *= 2.64;
	vec3 col = vec3(0.011, 0.038, 0.062);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2((time * 0.50) * 0.08 * fl) * p * (fl * 0.97 + 2.77) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.65;
		float pd = length(gv - off);
		float tw = 0.83 + 0.38 * sin((time * 0.50) * 3.38 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.83, 0.64, 0.95), vec3(0.46, 0.40, 0.28), hash21(id + 7.0));
		col += tint * smoothstep(0.12, 0.0, pd) * tw / fl;
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(1.018, 0.975, 1.005) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
