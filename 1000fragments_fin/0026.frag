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
	p.x += p.y * -0.47;
	vec3 col = vec3(0.12, 0.12, 0.12) * clamp(0.41 - p.y * 0.55, 0.0, 1.0);
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 1.11 + fa * 1.79 + (time * 0.61) * 0.23;
		float wv = vnoise2(vec2(xx, (time * 0.61) * 0.28 + fa * 7.31));
		float yc = -0.13 + (wv - 0.5) * 1.50;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 22.35);
		bnd *= 0.57 + 0.44 * sin(xx * 3.23 + (time * 0.61) * 1.50 + fa);
		col += (vec3(0.37) + 0.23 * cos(vec3(2.304, 3.725, 5.145) + fa * 1.00 + (time * 0.61) * 0.55)) * bnd * 1.14;
	}
	col = col / (1.0 + col * 0.80);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.57));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.55);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.025, 0.989, 0.947);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
