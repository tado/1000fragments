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
	vec3 col = mix(vec3(0.062, 0.061, 0.054), vec3(0.042, 0.040, 0.065), clamp(0.5 + p.y * -0.21 + p.x * -0.13, 0.0, 1.0));
	for(int li = 0; li < 13; li++){
		float fl = float(li);
		float fy = (fl / 13.0 - 0.5) * 2.04;
		float w = (vnoise2(vec2(p.x * 3.02 + fl * 7.3, (time * 0.74) * 0.82 + fl)) - 0.5) * 0.26;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(6.018, 8.094, 10.170) + fl * 0.59 + (time * 0.74) * 1.18)) * (0.0061 / (ld + 0.0050));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(0.968, 1.025, 0.956);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
