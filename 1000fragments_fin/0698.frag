uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.88) * (0.53 + 0.31 * h1) + fi * 2.39), cos((time * 0.88) * (0.59 + 1.05 * h2) + fi * 1.73)) * 0.87;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p = p.yx;
	p.x += p.y * 0.73;
	vec3 col = mix(vec3(0.038, 0.061, 0.039), vec3(0.021, 0.046, 0.065), clamp(0.5 + p.y * 0.02 + p.x * 0.00, 0.0, 1.0));
	for(int i = 0; i < 7; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(1.718, 3.700, 5.683) + fi * 1.06 + (time * 0.88) * 0.13)) * (0.0090 / (length(p - na) + 0.020));
		for(int j = i + 1; j < 7; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.84){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.45, 0.82, 0.21) * (0.0018 / (sd + 0.020)) * (1.0 - ll / 0.84);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(0.998, 0.998, 1.012);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
