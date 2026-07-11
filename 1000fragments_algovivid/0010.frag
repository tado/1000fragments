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
	p *= 1.05;
	vec3 col = vec3(0.07, 0.07, 0.07) * clamp(0.63 - p.y * 0.50, 0.0, 1.0);
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.18 + fa * 0.54 + (time * 0.62) * 0.19;
		float wv = vnoise2(vec2(xx, (time * 0.62) * 0.16 + fa * 7.31));
		float yc = -0.13 + (wv - 0.5) * 1.20;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 6.09) * exp(-max(dy, 0.0) * 4.71);
		bnd *= 0.63 + 0.37 * sin(xx * 4.57 + (time * 0.62) * 0.90 + fa);
		col += (vec3(0.49) + 0.16 * cos(vec3(0.0, 1.54, 3.07) + fa * 0.46 + (time * 0.62) * 0.54)) * bnd * 0.77;
	}
	col = col / (1.0 + col * 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col = clamp(col, 0.0, 1.0) * vec3(1.022, 0.984, 0.948) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
