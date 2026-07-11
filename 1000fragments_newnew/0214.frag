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
	vec3 col = vec3(0.002, 0.023, 0.028);
	for(int li = 0; li < 9; li++){
		float fl = float(li);
		float fy = (fl / 9.0 - 0.5) * 1.80;
		float w = (vnoise2(vec2(p.x * 4.99 + fl * 7.3, (time * 0.52) * 1.79 + fl)) - 0.5) * 0.24;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.42, 0.85) + fl * 1.08 + (time * 0.52) * 0.36)) * (0.0061 / (ld + 0.0068));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.19 * sin(gl_FragCoord.y * 0.92 + (time * 0.52) * 15.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.998, 0.950, 1.028) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
