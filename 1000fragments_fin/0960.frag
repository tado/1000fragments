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
	p.x += p.y * -0.46;
	p.y = abs(p.y);
	vec3 col = mix(vec3(0.077, 0.039, 0.042), vec3(0.102, 0.074, 0.060), clamp(0.5 + p.y * -0.40 + p.x * 0.19, 0.0, 1.0));
	for(int li = 0; li < 13; li++){
		float fl = float(li);
		float fy = (fl / 13.0 - 0.5) * 1.76;
		float w = (vnoise2(vec2(p.x * 3.76 + fl * 7.3, (time * 0.67) * 1.53 + fl)) - 0.5) * 0.37;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(5.467, 6.176, 6.885) + fl * 0.48 + (time * 0.67) * 0.73)) * (0.0042 / (ld + 0.0149));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(1.023, 0.948, 1.013);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
