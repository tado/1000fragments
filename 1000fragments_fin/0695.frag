uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.90) * (0.59 + 1.00 * h1) + fi * 2.39), cos((time * 0.90) * (0.59 + 1.14 * h2) + fi * 1.73)) * 0.80;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x = abs(p.x);
	p *= 1.00;
	vec3 col = mix(vec3(0.021, 0.047, 0.087), vec3(0.041, 0.046, 0.058), clamp(0.5 + p.y * -0.63 + p.x * -0.15, 0.0, 1.0));
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(3.858, 5.559, 7.259) + fi * 1.15 + (time * 0.90) * 0.79)) * (0.0099 / (length(p - na) + 0.012));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.07){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.83, 0.24, 0.94) * (0.0023 / (sd + 0.009)) * (1.0 - ll / 1.07);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.30 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(0.932, 0.979, 1.059);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
