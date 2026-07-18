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
	p.y = abs(p.y) - 0.47;
	p = p.yx;
	vec3 col = vec3(0.03, 0.03, 0.06) * clamp(0.63 - p.y * 0.55, 0.0, 1.0);
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.03 + fa * 0.87 + (time * 0.66) * 0.25;
		float wv = vnoise2(vec2(xx, (time * 0.66) * 0.25 + fa * 7.31));
		float yc = -0.25 + (wv - 0.5) * 0.89;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 6.11) * exp(-max(dy, 0.0) * 3.50);
		col += (vec3(0.45) + 0.21 * cos(vec3(3.384, 4.358, 5.333) + fa * 0.55 + (time * 0.66) * 0.19)) * bnd * 1.18;
	}
	col = col / (1.0 + col * 0.77);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.71));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(1.030, 0.987, 0.915);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
