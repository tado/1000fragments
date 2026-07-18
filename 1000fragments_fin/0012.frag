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
	vec3 col = vec3(0.08, 0.06, 0.06) * clamp(0.33 - p.y * 0.32, 0.0, 1.0);
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 1.42 + fa * 1.95 + (time * 0.60) * -0.11;
		float wv = vnoise2(vec2(xx, (time * 0.60) * 0.34 + fa * 7.31));
		float yc = 0.30 + (wv - 0.5) * 0.92;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 7.92) * exp(-max(dy, 0.0) * 3.63);
		bnd *= 0.66 + 0.37 * sin(xx * 5.22 + (time * 0.60) * 0.52 + fa);
		col += (vec3(0.42) + 0.29 * cos(vec3(0.828, 2.337, 3.845) + fa * 1.58 + (time * 0.60) * 0.67)) * bnd * 1.15;
	}
	col = col / (1.0 + col * 0.68);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(0.981, 1.010, 0.942);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
