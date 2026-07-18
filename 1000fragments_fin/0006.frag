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
	p += vec2(sin((time * 0.57) * 0.63), cos((time * 0.57) * 0.33)) * 0.08;
	vec3 col = vec3(0.12, 0.11, 0.07) * clamp(0.65 - p.y * 0.52, 0.0, 1.0);
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 1.94 + fa * 1.29 + (time * 0.57) * -0.23;
		float wv = vnoise2(vec2(xx, (time * 0.57) * 0.13 + fa * 7.31));
		float yc = 0.17 + (wv - 0.5) * 1.57;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 23.15);
		bnd *= 0.68 + 0.35 * sin(xx * 2.44 + (time * 0.57) * 0.85 + fa);
		col += (vec3(0.31) + 0.25 * cos(vec3(4.357, 5.772, 7.187) + fa * 1.09 + (time * 0.57) * 0.45)) * bnd * 1.15;
	}
	col = col / (1.0 + col * 0.71);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.033, 0.990, 0.918);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
