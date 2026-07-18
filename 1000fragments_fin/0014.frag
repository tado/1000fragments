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
	p.y = abs(p.y) - 0.45;
	vec3 col = vec3(0.08, 0.09, 0.07) * clamp(0.45 - p.y * 0.56, 0.0, 1.0);
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.49 + fa * 1.33 + (time * 0.75) * -0.23;
		float wv = vnoise2(vec2(xx, (time * 0.75) * 0.33 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.75) * 0.35 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.31 + (wv - 0.5) * 1.60;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 16.32);
		col = max(col, (vec3(0.29) + 0.20 * cos(vec3(1.375, 3.323, 5.271) + fa * 1.52 + (time * 0.75) * 0.15)) * bnd * 0.60);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.043, 0.999, 0.933);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
