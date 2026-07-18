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
	vec3 col = mix(vec3(0.032, 0.050, 0.089), vec3(0.028, 0.026, 0.112), clamp(0.5 + p.y * -0.42 + p.x * 0.14, 0.0, 1.0));
	for(int li = 0; li < 10; li++){
		float fl = float(li);
		float fy = (fl / 10.0 - 0.5) * 1.47;
		float w = (vnoise2(vec2(p.x * 3.32 + fl * 7.3, (time * 0.84) * 2.12 + fl)) - 0.5) * 0.29;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(1.846, 3.136, 4.427) + fl * 0.82 + (time * 0.84) * 0.42)) * (0.0045 / (ld + 0.0127));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.12));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.974, 1.001, 0.951);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
