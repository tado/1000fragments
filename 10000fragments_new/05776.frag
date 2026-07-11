uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.00;
	vec3 col = vec3(0.049, 0.037, 0.073);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.01 + 2.17) + vec2(fl * 7.31, -time * 3.79 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.80;
		float pd = length((gv - off) * vec2(7.70, 1.0));
		float tw = 0.65 + 0.16 * sin(time * 4.09 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.52, 0.30, 0.72), vec3(0.32, 0.52, 0.75), hash21(id + 7.0));
		col += tint * smoothstep(0.06, 0.0, pd) * tw / fl;
	}
	col = mod(col * 2.17, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
