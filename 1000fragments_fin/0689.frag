uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.66) * (0.60 + 0.39 * h1) + fi * 2.39), cos((time * 0.66) * (0.43 + 0.91 * h2) + fi * 1.73)) * 0.66;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p = p.yx;
	p.y += sin(p.x * 2.04 + (time * 0.66) * 0.48) * 0.07;
	p *= 1.11;
	vec3 col = mix(vec3(0.041, 0.054, 0.066), vec3(0.076, 0.036, 0.082), clamp(0.5 + p.y * 0.21 + p.x * -0.20, 0.0, 1.0));
	for(int i = 0; i < 7; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(1.812, 3.179, 4.546) + fi * 1.27 + (time * 0.66) * 0.39)) * (0.0072 / (length(p - na) + 0.021));
		for(int j = i + 1; j < 7; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.04){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(1.812, 3.179, 4.546) + ll * 3.61 + (time * 0.66) * 0.42)) * (0.0025 / (sd + 0.009)) * (1.0 - ll / 1.04);
			}
		}
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.14 * sin(gl_FragCoord.y * 1.46 + (time * 0.66) * 14.16);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.032, 0.976, 0.938);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
