uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p.y = abs(p.y);
	vec3 col = vec3(0.027, 0.006, 0.054);
	for(int li = 0; li < 10; li++){
		float fl = float(li);
		float fy = (fl / 10.0 - 0.5) * 1.41;
		float w = (vnoise2(vec2(p.x * 2.84 + fl * 7.3, (time * 0.58) * 0.61 + fl)) - 0.5) * 0.18;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.52, 3.04) + fl * 1.01 + (time * 0.58) * 0.81)) * (0.0043 / (ld + 0.0047));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.51 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.994, 0.943) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
