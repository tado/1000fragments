uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.81) * (0.75 + 0.82 * h1) + fi * 2.39), cos((time * 0.81) * (0.64 + 0.63 * h2) + fi * 1.73)) * 0.79;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y += sin(p.x * 1.24 + (time * 0.81) * 1.45) * 0.08;
	vec3 col = mix(vec3(0.074, 0.046, 0.049), vec3(0.116, 0.042, 0.046), clamp(0.5 + p.y * 0.58 + p.x * -0.14, 0.0, 1.0));
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(2.888, 4.285, 5.682) + fi * 0.46 + (time * 0.81) * 0.63)) * (0.0046 / (length(p - na) + 0.014));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.77){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.43, 0.63, 0.68) * (0.0014 / (sd + 0.013)) * (1.0 - ll / 0.77);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.044, 1.011, 0.930);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
