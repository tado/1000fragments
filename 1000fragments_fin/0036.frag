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
	vec3 col = vec3(0.03, 0.04, 0.04) * clamp(0.69 - p.y * 0.54, 0.0, 1.0);
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 1.91 + fa * 1.15 + (time * 0.71) * -0.12;
		float wv = vnoise2(vec2(xx, (time * 0.71) * 0.41 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.71) * 0.16 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.18 + (wv - 0.5) * 0.60;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 11.56);
		col += (vec3(0.26) + 0.17 * cos(vec3(3.821, 5.662, 7.504) + fa * 1.67 + (time * 0.71) * 0.24)) * bnd * 0.84;
	}
	col = col / (1.0 + col * 0.64);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.945, 0.979, 1.038);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
