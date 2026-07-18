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
	vec3 col = vec3(0.03, 0.04, 0.05) * clamp(0.52 - p.y * 0.27, 0.0, 1.0);
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.87 + fa * 1.89 + (time * 0.83) * -0.12;
		float wv = vnoise2(vec2(xx, (time * 0.83) * 0.39 + fa * 7.31));
		float yc = -0.11 + (wv - 0.5) * 0.79;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 4.74) * exp(-max(dy, 0.0) * 2.64);
		col = max(col, (vec3(0.36) + 0.17 * cos(vec3(4.655, 5.801, 6.947) + fa * 0.46 + (time * 0.83) * 0.29)) * bnd * 0.84);
	}
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.045, 1.008, 0.937);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
