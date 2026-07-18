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
	vec3 col = vec3(0.06, 0.04, 0.04) * clamp(0.35 - p.y * 0.48, 0.0, 1.0);
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 1.00 + fa * 1.35 + (time * 0.57) * -0.18;
		float wv = vnoise2(vec2(xx, (time * 0.57) * 0.30 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.57) * 0.50 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.07 + (wv - 0.5) * 0.91;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 14.16);
		col = max(col, (vec3(0.30) + 0.13 * cos(vec3(1.594, 3.519, 5.444) + fa * 1.44 + (time * 0.57) * 0.46)) * bnd * 0.59);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.962, 0.995, 0.946);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
