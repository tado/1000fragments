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
	p.x += p.y * -0.75;
	p *= 1.47;
	vec3 col = mix(vec3(0.025, 0.041, 0.041), vec3(0.019, 0.023, 0.073), clamp(0.5 + p.y * -0.48 + p.x * 0.27, 0.0, 1.0));
	for(int li = 0; li < 19; li++){
		float fl = float(li);
		float fy = (fl / 19.0 - 0.5) * 1.49;
		float w = (vnoise2(vec2(p.x * 4.96 + fl * 7.3, (time * 0.62) * 1.89 + fl)) - 0.5) * 0.24;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(3.357, 5.330, 7.303) + fl * 1.15 + (time * 0.62) * 0.25)) * (0.0027 / (ld + 0.0060));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(0.949, 0.973, 1.042);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
