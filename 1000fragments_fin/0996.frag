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
	vec3 col = mix(vec3(0.063, 0.042, 0.060), vec3(0.059, 0.048, 0.067), clamp(0.5 + p.y * -0.36 + p.x * 0.22, 0.0, 1.0));
	for(int li = 0; li < 17; li++){
		float fl = float(li);
		float fy = (fl / 17.0 - 0.5) * 2.07;
		float w = (vnoise2(vec2(p.x * 2.43 + fl * 7.3, (time * 0.65) * 1.38 + fl)) - 0.5) * 0.40;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(1.145, 2.252, 3.359) + fl * 0.36 + (time * 0.65) * 0.31)) * (0.0047 / (ld + 0.0148));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(0.990, 0.998, 1.013);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
