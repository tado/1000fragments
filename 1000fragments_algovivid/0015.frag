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
	p = p.yx;
	p *= 1.29;
	vec3 col = vec3(0.07, 0.03, 0.03) * clamp(0.56 - p.y * 0.47, 0.0, 1.0);
	vec2 sc2 = floor(p * 6.35); vec2 sf2 = fract(p * 6.35) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.54) * smoothstep(0.07, 0.0, length(sf2)) * step(0.94, sh2) * (0.41 + 0.25 * sin((time * 0.51) * 3.09 + sh2 * 40.0));
	for(int ai = 0; ai < 7; ai++){
		float fa = float(ai);
		float xx = p.x * 0.99 + fa * 1.15 + (time * 0.51) * -0.16;
		float wv = vnoise2(vec2(xx, (time * 0.51) * 0.20 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.51) * 0.15 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.21 + (wv - 0.5) * 1.30;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 7.08);
		col += (vec3(0.49) + 0.20 * cos(vec3(0.0, 0.69, 1.38) + fa * 1.57 + (time * 0.51) * 0.30)) * bnd * 0.90;
	}
	col = col / (1.0 + col * 0.76);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(1.031, 1.001, 0.911) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
