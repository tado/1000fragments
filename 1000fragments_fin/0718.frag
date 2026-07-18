uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.81) * (0.49 + 0.82 * h1) + fi * 2.39), cos((time * 0.81) * (0.76 + 0.42 * h2) + fi * 1.73)) * 0.81;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.x = abs(p.x);
	p = p.yx;
	vec3 col = mix(vec3(0.046, 0.041, 0.086), vec3(0.047, 0.035, 0.080), clamp(0.5 + p.y * -0.62 + p.x * 0.16, 0.0, 1.0));
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(1.374, 2.195, 3.016) + fi * 0.79 + (time * 0.81) * 0.85)) * (0.0104 / (length(p - na) + 0.024));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.92){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(1.374, 2.195, 3.016) + ll * 2.64 + (time * 0.81) * 0.83)) * (0.0024 / (sd + 0.013)) * (1.0 - ll / 0.92);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(0.987, 1.008, 0.985);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
