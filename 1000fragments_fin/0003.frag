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
	p.y = abs(p.y) - 0.29;
	vec3 col = vec3(0.04, 0.00, 0.02) * clamp(0.48 - p.y * 0.27, 0.0, 1.0);
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 1.59 + fa * 1.28 + (time * 0.89) * 0.12;
		float wv = vnoise2(vec2(xx, (time * 0.89) * 0.21 + fa * 7.31));
		float yc = 0.11 + (wv - 0.5) * 1.60;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 7.79);
		bnd *= 0.69 + 0.45 * sin(xx * 4.09 + (time * 0.89) * 1.79 + fa);
		col += (vec3(0.42) + 0.22 * cos(vec3(0.286, 1.093, 1.899) + fa * 0.79 + (time * 0.89) * 0.61)) * bnd * 0.61;
	}
	col = col / (1.0 + col * 0.42);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.50);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(0.949, 0.983, 1.040);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.22 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
