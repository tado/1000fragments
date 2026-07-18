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
	vec3 col = vec3(0.09, 0.06, 0.08) * clamp(0.68 - p.y * 0.56, 0.0, 1.0);
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.97 + fa * 1.03 + (time * 0.77) * -0.12;
		float wv = vnoise2(vec2(xx, (time * 0.77) * 0.36 + fa * 7.31));
		float yc = -0.35 + (wv - 0.5) * 0.86;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 3.74) * exp(-max(dy, 0.0) * 4.97);
		col += (vec3(0.33) + 0.17 * cos(vec3(3.185, 5.028, 6.871) + fa * 1.73 + (time * 0.77) * 0.75)) * bnd * 0.77;
	}
	col = col / (1.0 + col * 0.64);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.033, 0.992, 0.930);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
