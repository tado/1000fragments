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
	p.x += p.y * -0.73;
	vec3 col = vec3(0.12, 0.11, 0.11) * clamp(0.31 - p.y * 0.57, 0.0, 1.0);
	vec2 sc2 = floor(p * 11.80); vec2 sf2 = fract(p * 11.80) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.42) * smoothstep(0.06, 0.0, length(sf2)) * step(0.92, sh2) * (0.54 + 0.32 * sin((time * 0.77) * 1.56 + sh2 * 40.0));
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 2.15 + fa * 1.97 + (time * 0.77) * 0.25;
		float wv = vnoise2(vec2(xx, (time * 0.77) * 0.23 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.77) * 0.21 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.30 + (wv - 0.5) * 1.06;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 22.77);
		col += (vec3(0.44) + 0.23 * cos(vec3(5.710, 6.788, 7.865) + fa * 1.10 + (time * 0.77) * 0.36)) * bnd * 1.20;
	}
	col = col / (1.0 + col * 0.69);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.051, 0.995, 0.939);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
