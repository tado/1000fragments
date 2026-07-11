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
	vec3 col = vec3(0.027, 0.050, 0.016);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2(time * 0.10 * fl) * p * (fl * 1.26 + 2.56) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.67;
		float pd = length(gv - off);
		float tw = 0.67 + 0.18 * sin(time * 5.39 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.48, 0.81, 0.84), vec3(0.34, 0.81, 0.60), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	col *= 0.85 + 0.15 * sin(gl_FragCoord.y * 2.48 + time * 4.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
