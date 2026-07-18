uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.80) * (0.49 + 0.86 * h1) + fi * 2.39), cos((time * 0.80) * (0.46 + 0.55 * h2) + fi * 1.73)) * 0.90;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.y = abs(p.y) - 0.35;
	p.x = abs(p.x) - 0.41;
	vec3 col = mix(vec3(0.044, 0.030, 0.080), vec3(0.048, 0.066, 0.071), clamp(0.5 + p.y * 0.01 + p.x * -0.28, 0.0, 1.0));
	for(int i = 0; i < 8; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(2.096, 3.956, 5.815) + fi * 1.01 + (time * 0.80) * 0.70)) * (0.0079 / (length(p - na) + 0.019));
		for(int j = i + 1; j < 8; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.95){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.63, 0.34, 0.39) * (0.0016 / (sd + 0.019)) * (1.0 - ll / 0.95);
			}
		}
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.020, 0.987, 0.948);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
