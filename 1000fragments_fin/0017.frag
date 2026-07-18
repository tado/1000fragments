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
	p = p.yx;
	vec3 col = vec3(0.12, 0.10, 0.09) * clamp(0.31 - p.y * 0.53, 0.0, 1.0);
	for(int ai = 0; ai < 7; ai++){
		float fa = float(ai);
		float xx = p.x * 1.20 + fa * 1.16 + (time * 0.59) * -0.23;
		float wv = vnoise2(vec2(xx, (time * 0.59) * 0.25 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.59) * 0.65 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.28 + (wv - 0.5) * 0.95;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 18.65);
		bnd *= 0.60 + 0.35 * sin(xx * 2.65 + (time * 0.59) * 0.73 + fa);
		col += (vec3(0.32) + 0.27 * cos(vec3(1.188, 2.016, 2.843) + fa * 0.52 + (time * 0.59) * 0.35)) * bnd * 0.75;
	}
	col = col / (1.0 + col * 0.78);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(0.936, 0.982, 1.043);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
