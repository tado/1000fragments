uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.80) * (0.40 + 0.72 * h1) + fi * 2.39), cos((time * 0.80) * (0.76 + 1.09 * h2) + fi * 1.73)) * 0.94;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p += vec2(sin((time * 0.80) * 1.07), cos((time * 0.80) * 1.07)) * 0.14;
	p.y += sin(p.x * 1.53 + (time * 0.80) * 0.75) * 0.16;
	vec3 col = mix(vec3(0.059, 0.029, 0.064), vec3(0.045, 0.045, 0.040), clamp(0.5 + p.y * 0.63 + p.x * -0.18, 0.0, 1.0));
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(2.587, 4.615, 6.643) + fi * 0.65 + (time * 0.80) * 0.30)) * (0.0073 / (length(p - na) + 0.020));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.97){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.74, 0.99, 0.43) * (0.0021 / (sd + 0.010)) * (1.0 - ll / 0.97);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.030, 0.975, 1.021);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
