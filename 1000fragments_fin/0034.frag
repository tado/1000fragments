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
	p += vec2(sin((time * 0.91) * 0.77), cos((time * 0.91) * 0.87)) * 0.11;
	p.x += p.y * -0.63;
	vec3 col = vec3(0.09, 0.04, 0.07) * clamp(0.69 - p.y * 0.29, 0.0, 1.0);
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 1.01 + fa * 0.71 + (time * 0.91) * 0.07;
		float wv = vnoise2(vec2(xx, (time * 0.91) * 0.39 + fa * 7.31));
		float yc = -0.13 + (wv - 0.5) * 0.91;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 7.17) * exp(-max(dy, 0.0) * 1.73);
		col += (vec3(0.47) + 0.18 * cos(vec3(2.098, 4.178, 6.259) + fa * 0.49 + (time * 0.91) * 0.80)) * bnd * 0.75;
	}
	col = col / (1.0 + col * 0.51);
	col = clamp((col - 0.5) * 1.22 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.45);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.010, 1.011, 1.002);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
