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
	p += vec2(sin((time * 0.79) * 0.65), cos((time * 0.79) * 1.02)) * 0.16;
	vec3 col = mix(vec3(0.062, 0.047, 0.070), vec3(0.027, 0.039, 0.035), clamp(0.5 + p.y * -0.47 + p.x * 0.16, 0.0, 1.0));
	for(int li = 0; li < 13; li++){
		float fl = float(li);
		float fy = (fl / 13.0 - 0.5) * 1.52;
		float w = (vnoise2(vec2(p.x * 4.58 + fl * 7.3, (time * 0.79) * 1.20 + fl)) - 0.5) * 0.33;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(2.410, 4.476, 6.543) + fl * 1.10 + (time * 0.79) * 0.81)) * (0.0022 / (ld + 0.0138));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(0.948, 0.992, 1.046);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
