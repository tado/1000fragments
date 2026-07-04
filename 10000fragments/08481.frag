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
	p *= 2.00;
	vec3 col = vec3(0.028, 0.025, 0.027);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2(time * -0.30 * fl) * p * (fl * 1.91 + 3.45) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.70;
		float pd = length(gv - off);
		float tw = 0.75 + 0.17 * sin(time * 3.33 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.79, 0.94, 0.99), vec3(0.33, 0.64, 0.97), hash21(id + 7.0));
		col += tint * smoothstep(0.05, 0.0, pd) * tw / fl;
	}
	col *= 0.84 + 0.20 * sin(gl_FragCoord.y * 1.47 + time * 10.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
