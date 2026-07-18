uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.91) * (0.32 + 1.15 * h1) + fi * 2.39), cos((time * 0.91) * (0.67 + 1.15 * h2) + fi * 1.73)) * 0.58;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y += sin(p.x * 2.65 + (time * 0.91) * 0.79) * 0.08;
	vec3 col = mix(vec3(0.025, 0.023, 0.053), vec3(0.009, 0.021, 0.051), clamp(0.5 + p.y * -0.04 + p.x * 0.15, 0.0, 1.0));
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.119, 1.319, 2.519) + fi * 1.19 + (time * 0.91) * 0.32)) * (0.0072 / (length(p - na) + 0.020));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.86){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.39, 0.29, 0.74) * (0.0023 / (sd + 0.016)) * (1.0 - ll / 0.86);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.11 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.022, 0.950, 0.995);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
