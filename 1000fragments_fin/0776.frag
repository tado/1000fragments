uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.80 + (time * 0.65) * 1.31) * 0.09;
	p.x += p.y * 0.35;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	p *= 1.84;
	float acc = 0.0;
	for(int ri = 0; ri < 9; ri++){
		float fi = float(ri);
		float cyc = (time * 0.65) * 0.73 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.55;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.39) * 22.68) * (1.0 - age) * exp(-dist * 1.18);
	}
	float cc = clamp(0.5 + 0.5 * (acc), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.131, 0.055, 0.157), vec3(0.736, 0.344, 0.479), smoothstep(0.0, 0.61, cc)), vec3(0.995, 0.940, 0.830), smoothstep(0.61, 1.0, cc));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.038, 0.987, 0.917);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
