uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.86) * (0.55 + 0.93 * h1) + fi * 2.39), cos((time * 0.86) * (0.49 + 0.58 * h2) + fi * 1.73)) * 0.90;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x += p.y * -0.55;
	p *= 1.14;
	vec3 col = mix(vec3(0.069, 0.030, 0.060), vec3(0.038, 0.056, 0.073), clamp(0.5 + p.y * 0.53 + p.x * 0.17, 0.0, 1.0));
	for(int i = 0; i < 7; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(3.646, 4.928, 6.211) + fi * 0.46 + (time * 0.86) * 0.31)) * (0.0068 / (length(p - na) + 0.017));
		for(int j = i + 1; j < 7; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.83){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.36, 0.56, 0.74) * (0.0030 / (sd + 0.017)) * (1.0 - ll / 0.83);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.935, 0.975, 1.040);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
