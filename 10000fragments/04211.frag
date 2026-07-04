uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.79;
	vec3 col = vec3(0.050, 0.014, 0.050);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2(time * 0.24 * fl) * p * (fl * 0.98 + 1.69) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.55;
		float pd = length(gv - off);
		float tw = 0.81 + 0.32 * sin(time * 2.10 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.75, 0.25, 0.43), vec3(0.36, 0.24, 0.91), hash21(id + 7.0));
		col += tint * smoothstep(0.07, 0.0, pd) * tw / fl;
	}
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
