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
	p.x = abs(p.x);
	p.y = abs(p.y);
	p = p.yx;
	vec3 col = vec3(0.09, 0.07, 0.04) * clamp(0.47 - p.y * 0.38, 0.0, 1.0);
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 1.47 + fa * 1.81 + (time * 0.73) * 0.27;
		float wv = vnoise2(vec2(xx, (time * 0.73) * 0.34 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.73) * 0.56 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.13 + (wv - 0.5) * 0.98;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 11.47);
		bnd *= 0.66 + 0.40 * sin(xx * 5.47 + (time * 0.73) * 0.91 + fa);
		col += (vec3(0.44) + 0.29 * cos(vec3(0.0, 1.50, 3.01) + fa * 1.67 + (time * 0.73) * 0.57)) * bnd * 0.97;
	}
	col = col / (1.0 + col * 0.89);
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 1.88 + (time * 0.73) * 10.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.35);
	col = clamp(col, 0.0, 1.0) * vec3(0.939, 0.994, 1.020) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
