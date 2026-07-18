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
	if(resolution.x > resolution.y * 1.9) p = p.yx;
	p.x += p.y * 0.32;
	p.y += sin(p.x * 2.55 + (time * 0.80) * 1.44) * 0.15;
	p = p.yx;
	vec3 col = vec3(0.08, 0.09, 0.11) * clamp(0.63 - p.y * 0.42, 0.0, 1.0);
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.14 + fa * 0.76 + (time * 0.80) * -0.08;
		float wv = vnoise2(vec2(xx, (time * 0.80) * 0.19 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.80) * 0.19 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.17 + (wv - 0.5) * 1.13;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 5.57) * exp(-max(dy, 0.0) * 1.66);
		col += (vec3(0.27) + 0.22 * cos(vec3(4.539, 5.763, 6.986) + fa * 0.76 + (time * 0.80) * 0.73)) * bnd * 1.00;
	}
	col = col / (1.0 + col * 0.44);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.45);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.014, 0.987, 0.941);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
