uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.90) * (0.52 + 0.73 * h1) + fi * 2.39), cos((time * 0.90) * (0.68 + 0.49 * h2) + fi * 1.73)) * 0.92;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p *= 1.30;
	p.y += sin(p.x * 1.26 + (time * 0.90) * 0.61) * 0.09;
	p *= 1.05;
	vec3 col = mix(vec3(0.025, 0.064, 0.090), vec3(0.024, 0.094, 0.110), clamp(0.5 + p.y * 0.39 + p.x * -0.09, 0.0, 1.0));
	for(int i = 0; i < 8; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(1.441, 2.623, 3.805) + fi * 1.46 + (time * 0.90) * 0.41)) * (0.0074 / (length(p - na) + 0.018));
		for(int j = i + 1; j < 8; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.81){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.28, 0.60, 0.53) * (0.0022 / (sd + 0.015)) * (1.0 - ll / 0.81);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.003, 0.958, 1.014);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
