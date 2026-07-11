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
	p *= 0.96;
	p += vec2(sin((time * 0.78) * 1.04), cos((time * 0.78) * 1.08)) * 0.07;
	vec3 col = vec3(0.06, 0.04, 0.05) * clamp(0.39 - p.y * 0.60, 0.0, 1.0);
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 1.59 + fa * 0.87 + (time * 0.78) * 0.25;
		float wv = vnoise2(vec2(xx, (time * 0.78) * 0.11 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.78) * 0.26 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.07 + (wv - 0.5) * 0.76;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 25.00);
		bnd *= 0.67 + 0.44 * sin(xx * 2.75 + (time * 0.78) * 1.14 + fa);
		col = max(col, (vec3(0.41) + 0.22 * cos(vec3(0.0, 0.45, 0.90) + fa * 1.66 + (time * 0.78) * 0.62)) * bnd * 0.59);
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.65);
	col = clamp(col, 0.0, 1.0) * vec3(1.057, 0.989, 0.933) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
