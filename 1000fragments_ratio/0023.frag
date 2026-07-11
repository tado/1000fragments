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
	p *= 0.87;
	vec3 col = vec3(0.07, 0.08, 0.09) * clamp(0.36 - p.y * 0.22, 0.0, 1.0);
	vec2 sc2 = floor(p * 12.27); vec2 sf2 = fract(p * 12.27) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.51) * smoothstep(0.07, 0.0, length(sf2)) * step(0.93, sh2) * (0.45 + 0.25 * sin((time * 0.68) * 3.74 + sh2 * 40.0));
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 1.20 + fa * 1.79 + (time * 0.68) * 0.10;
		float wv = vnoise2(vec2(xx, (time * 0.68) * 0.48 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.68) * 0.50 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.23 + (wv - 0.5) * 0.83;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 7.37) * exp(-max(dy, 0.0) * 1.83);
		col += (vec3(0.34) + 0.22 * cos(vec3(0.0, 1.41, 2.82) + fa * 1.53 + (time * 0.68) * 0.52)) * bnd * 0.63;
	}
	col = col / (1.0 + col * 0.90);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(0.922, 0.993, 1.053) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
