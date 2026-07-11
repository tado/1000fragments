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
	p.y = abs(p.y);
	vec3 col = vec3(0.05, 0.07, 0.06) * clamp(0.34 - p.y * 0.40, 0.0, 1.0);
	vec2 sc2 = floor(p * 6.33); vec2 sf2 = fract(p * 6.33) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.62) * smoothstep(0.06, 0.0, length(sf2)) * step(0.95, sh2) * (0.54 + 0.22 * sin((time * 0.81) * 2.90 + sh2 * 40.0));
	for(int ai = 0; ai < 7; ai++){
		float fa = float(ai);
		float xx = p.x * 1.46 + fa * 1.90 + (time * 0.81) * 0.14;
		float wv = vnoise2(vec2(xx, (time * 0.81) * 0.34 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.81) * 0.24 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.02 + (wv - 0.5) * 1.26;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 7.54);
		col += (vec3(0.34) + 0.21 * cos(vec3(0.0, 0.72, 1.44) + fa * 0.76 + (time * 0.81) * 0.72)) * bnd * 0.92;
	}
	col = col / (1.0 + col * 0.41);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col = clamp(col, 0.0, 1.0) * vec3(0.967, 1.015, 0.921) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
