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
	p += vec2(sin((time * 0.72) * 0.92), cos((time * 0.72) * 1.08)) * 0.18;
	vec3 col = vec3(0.07, 0.04, 0.08) * clamp(0.54 - p.y * 0.49, 0.0, 1.0);
	vec2 sc2 = floor(p * 11.51); vec2 sf2 = fract(p * 11.51) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.44) * smoothstep(0.06, 0.0, length(sf2)) * step(0.92, sh2) * (0.49 + 0.27 * sin((time * 0.72) * 2.82 + sh2 * 40.0));
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.55 + fa * 1.12 + (time * 0.72) * -0.24;
		float wv = vnoise2(vec2(xx, (time * 0.72) * 0.36 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.72) * 0.41 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.21 + (wv - 0.5) * 0.79;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 22.19);
		bnd *= 0.60 + 0.38 * sin(xx * 5.61 + (time * 0.72) * 0.82 + fa);
		col += (vec3(0.26) + 0.19 * cos(vec3(0.0, 1.09, 2.18) + fa * 1.55 + (time * 0.72) * 0.37)) * bnd * 1.10;
	}
	col = col / (1.0 + col * 0.65);
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.955, 0.997, 0.926) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
