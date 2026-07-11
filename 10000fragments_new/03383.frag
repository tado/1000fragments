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
	p *= 2.63;
	vec3 col = vec3(0.036, 0.033, 0.022);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2(time * -0.21 * fl) * p * (fl * 1.59 + 1.52) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.88;
		float pd = length(gv - off);
		float tw = 0.71 + 0.37 * sin(time * 2.66 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.83, 0.88, 0.70), vec3(1.00, 0.53, 0.79), hash21(id + 7.0));
		col += tint * smoothstep(0.15, 0.0, pd) * tw / fl;
	}
	col *= 0.84 + 0.15 * sin(gl_FragCoord.y * 1.50 + time * 15.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
