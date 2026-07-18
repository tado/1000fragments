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
	p.y += sin(p.x * 2.23 + (time * 0.84) * 1.34) * 0.19;
	p.x = abs(p.x);
	vec3 col = vec3(0.07, 0.09, 0.04) * clamp(0.41 - p.y * 0.21, 0.0, 1.0);
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 2.10 + fa * 1.79 + (time * 0.84) * 0.17;
		float wv = vnoise2(vec2(xx, (time * 0.84) * 0.25 + fa * 7.31));
		float yc = -0.26 + (wv - 0.5) * 1.22;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 18.59);
		col += (vec3(0.29) + 0.27 * cos(vec3(1.002, 2.858, 4.714) + fa * 1.39 + (time * 0.84) * 0.76)) * bnd * 1.09;
	}
	col = col / (1.0 + col * 0.84);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.99));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(0.928, 0.998, 1.054);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
