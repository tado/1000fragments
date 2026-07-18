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
	p += vec2(sin((time * 0.75) * 0.38), cos((time * 0.75) * 0.97)) * 0.08;
	p.x = abs(p.x) - 0.57;
	p = p.yx;
	vec3 col = vec3(0.08, 0.07, 0.06) * clamp(0.65 - p.y * 0.22, 0.0, 1.0);
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 1.57 + fa * 0.59 + (time * 0.75) * 0.13;
		float wv = vnoise2(vec2(xx, (time * 0.75) * 0.19 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.75) * 0.24 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.13 + (wv - 0.5) * 1.38;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 13.88);
		bnd *= 0.58 + 0.36 * sin(xx * 3.93 + (time * 0.75) * 1.70 + fa);
		col = max(col, (vec3(0.34) + 0.30 * cos(vec3(1.817, 2.815, 3.813) + fa * 0.52 + (time * 0.75) * 0.35)) * bnd * 0.72);
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(1.30));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.984, 1.025, 0.938);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
