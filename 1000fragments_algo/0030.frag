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
	p += vec2(sin((time * 0.65) * 0.45), cos((time * 0.65) * 0.53)) * 0.18;
	p.x += p.y * 0.61;
	vec3 col = vec3(0.11, 0.12, 0.10) * clamp(0.66 - p.y * 0.20, 0.0, 1.0);
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.85 + fa * 0.90 + (time * 0.65) * -0.29;
		float wv = vnoise2(vec2(xx, (time * 0.65) * 0.25 + fa * 7.31));
		float yc = -0.22 + (wv - 0.5) * 0.66;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 28.35);
		col += (vec3(0.35) + 0.25 * cos(vec3(0.0, 1.01, 2.02) + fa * 0.41 + (time * 0.65) * 0.46)) * bnd * 0.85;
	}
	col = col / (1.0 + col * 0.84);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.45));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(0.999, 1.018, 1.014) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
