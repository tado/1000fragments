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
	p += vec2(sin((time * 0.58) * 0.83), cos((time * 0.58) * 1.11)) * 0.10;
	vec3 col = mix(vec3(0.073, 0.048, 0.043), vec3(0.086, 0.075, 0.040), clamp(0.5 + p.y * -0.21 + p.x * -0.07, 0.0, 1.0));
	for(int li = 0; li < 17; li++){
		float fl = float(li);
		float fy = (fl / 17.0 - 0.5) * 1.74;
		float w = (vnoise2(vec2(p.x * 1.92 + fl * 7.3, (time * 0.58) * 1.96 + fl)) - 0.5) * 0.33;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(2.852, 4.443, 6.035) + fl * 1.12 + (time * 0.58) * 0.25)) * (0.0032 / (ld + 0.0048));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.017, 0.994, 0.953);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
