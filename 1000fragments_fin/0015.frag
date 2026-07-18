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
	p.x = abs(p.x);
	p *= 1.40;
	vec3 col = vec3(0.06, 0.09, 0.10) * clamp(0.62 - p.y * 0.33, 0.0, 1.0);
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.70 + fa * 1.45 + (time * 0.71) * 0.05;
		float wv = vnoise2(vec2(xx, (time * 0.71) * 0.47 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.71) * 0.16 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.18 + (wv - 0.5) * 1.01;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 3.28) * exp(-max(dy, 0.0) * 1.01);
		bnd *= 0.65 + 0.30 * sin(xx * 5.79 + (time * 0.71) * 0.91 + fa);
		col += (vec3(0.27) + 0.27 * cos(vec3(0.206, 1.184, 2.162) + fa * 0.50 + (time * 0.71) * 0.34)) * bnd * 0.98;
	}
	col = col / (1.0 + col * 0.74);
	col *= 0.85 + 0.16 * sin(gl_FragCoord.y * 2.92 + (time * 0.71) * 8.74);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(0.925, 0.970, 1.050);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
