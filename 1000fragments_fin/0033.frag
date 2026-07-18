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
	vec3 col = vec3(0.02, 0.03, 0.04) * clamp(0.38 - p.y * 0.23, 0.0, 1.0);
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.64 + fa * 1.11 + (time * 0.86) * -0.05;
		float wv = vnoise2(vec2(xx, (time * 0.86) * 0.21 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.86) * 0.66 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.17 + (wv - 0.5) * 1.15;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 26.51);
		col += (vec3(0.50) + 0.21 * cos(vec3(6.017, 8.041, 10.066) + fa * 0.42 + (time * 0.86) * 0.54)) * bnd * 0.60;
	}
	col = col / (1.0 + col * 0.75);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(0.923, 0.972, 1.041);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
