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
	p *= 1.03;
	p = p.yx;
	vec3 col = vec3(0.10, 0.10, 0.05) * clamp(0.57 - p.y * 0.48, 0.0, 1.0);
	vec2 sc2 = floor(p * 7.33); vec2 sf2 = fract(p * 7.33) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.41) * smoothstep(0.06, 0.0, length(sf2)) * step(0.90, sh2) * (0.56 + 0.35 * sin((time * 0.73) * 3.55 + sh2 * 40.0));
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.98 + fa * 0.81 + (time * 0.73) * -0.22;
		float wv = vnoise2(vec2(xx, (time * 0.73) * 0.44 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.73) * 0.70 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.08 + (wv - 0.5) * 1.02;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 13.55);
		col = max(col, (vec3(0.31) + 0.24 * cos(vec3(5.511, 7.569, 9.627) + fa * 1.72 + (time * 0.73) * 0.38)) * bnd * 0.84);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.010, 0.991, 1.000);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
