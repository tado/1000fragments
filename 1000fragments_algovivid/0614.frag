uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.85 + (time * 0.78) * 0.57) * 0.13;
	p *= 1.59;
	vec3 col = vec3(0.027, 0.021, 0.067);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.34 + 4.45) + vec2(fl * 7.31, -(time * 0.78) * 3.41 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.75;
		float pd = length((gv - off) * vec2(7.54, 1.0));
		float tw = 0.84 + 0.27 * sin((time * 0.78) * 2.50 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.63, 0.94, 0.66), vec3(0.38, 0.88, 0.53), hash21(id + 7.0));
		col += tint * smoothstep(0.11, 0.0, pd) * tw / fl;
	}
	col += (hash21(gl_FragCoord.xy + fract((time * 0.78)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.34);
	col = clamp(col, 0.0, 1.0) * vec3(0.929, 0.973, 1.036) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
