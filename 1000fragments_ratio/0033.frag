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
	vec3 col = vec3(0.08, 0.08, 0.06) * clamp(0.69 - p.y * 0.54, 0.0, 1.0);
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 1.20 + fa * 1.45 + (time * 0.58) * -0.10;
		float wv = vnoise2(vec2(xx, (time * 0.58) * 0.46 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.58) * 0.44 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.03 + (wv - 0.5) * 1.02;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 28.59);
		col += (vec3(0.47) + 0.13 * cos(vec3(0.0, 1.41, 2.82) + fa * 1.66 + (time * 0.58) * 0.21)) * bnd * 1.07;
	}
	col = col / (1.0 + col * 0.58);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.51));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 0.953, 0.996) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
