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
	p.y += sin(p.x * 2.85 + (time * 0.59) * 1.45) * 0.07;
	vec3 col = mix(vec3(0.049, 0.041, 0.070), vec3(0.078, 0.071, 0.029), clamp(0.5 + p.y * 0.62 + p.x * 0.30, 0.0, 1.0));
	for(int li = 0; li < 12; li++){
		float fl = float(li);
		float fy = (fl / 12.0 - 0.5) * 1.98;
		float w = (vnoise2(vec2(p.x * 3.37 + fl * 7.3, (time * 0.59) * 1.49 + fl)) - 0.5) * 0.36;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(3.811, 5.168, 6.525) + fl * 0.39 + (time * 0.59) * 1.13)) * (0.0052 / (ld + 0.0059));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.25);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(0.985, 1.019, 0.937);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
