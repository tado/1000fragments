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
	if(resolution.x > resolution.y * 1.9) p = p.yx;
	p = p.yx;
	vec3 col = vec3(0.02, 0.03, 0.05) * clamp(0.36 - p.y * 0.59, 0.0, 1.0);
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 2.14 + fa * 1.41 + (time * 0.75) * -0.07;
		float wv = vnoise2(vec2(xx, (time * 0.75) * 0.36 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.75) * 0.39 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.09 + (wv - 0.5) * 1.41;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 10.01);
		bnd *= 0.59 + 0.38 * sin(xx * 2.91 + (time * 0.75) * 0.75 + fa);
		col += (vec3(0.44) + 0.26 * cos(vec3(1.822, 2.983, 4.144) + fa * 0.62 + (time * 0.75) * 0.53)) * bnd * 0.56;
	}
	col = col / (1.0 + col * 0.89);
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.018, 0.976, 0.947);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
