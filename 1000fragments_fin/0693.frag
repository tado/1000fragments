uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.70) * (0.79 + 0.77 * h1) + fi * 2.39), cos((time * 0.70) * (0.47 + 0.39 * h2) + fi * 1.73)) * 0.72;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.x = abs(p.x) - 0.34;
	vec3 col = mix(vec3(0.077, 0.051, 0.047), vec3(0.101, 0.076, 0.018), clamp(0.5 + p.y * 0.22 + p.x * -0.11, 0.0, 1.0));
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(1.878, 3.123, 4.368) + fi * 0.58 + (time * 0.70) * 0.46)) * (0.0074 / (length(p - na) + 0.019));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.96){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.59, 0.42, 0.44) * (0.0024 / (sd + 0.011)) * (1.0 - ll / 0.96);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.027, 0.996, 0.919);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
