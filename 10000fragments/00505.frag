uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.003, 0.021, 0.072);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 2.00 + 3.27) + vec2(time * -0.41, time * 0.37) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.79;
		float pd = length(gv - off);
		float tw = 0.78 + 0.18 * sin(time * 1.76 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.64, 0.38, 0.89), vec3(0.69, 0.99, 0.55), hash21(id + 7.0));
		col += tint * smoothstep(0.17, 0.0, pd) * tw / fl;
	}
	col = mod(col * 1.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
