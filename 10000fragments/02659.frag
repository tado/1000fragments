uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.041, 0.014, 0.034);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2(time * -0.18 * fl) * p * (fl * 1.24 + 2.45) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.86;
		float pd = length(gv - off);
		float tw = 0.73 + 0.22 * sin(time * 4.69 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.80, 0.31, 0.94), vec3(0.78, 0.54, 0.83), hash21(id + 7.0));
		col += tint * smoothstep(0.14, 0.0, pd) * tw / fl;
	}
	col = fract(col * 1.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
