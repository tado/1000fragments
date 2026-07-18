uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.61) * (0.51 + 0.66 * h1) + fi * 2.39), cos((time * 0.61) * (0.61 + 0.66 * h2) + fi * 1.73)) * 0.86;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y = abs(p.y) - 0.50;
	p = rot2((time * 0.61) * 1.29) * p;
	vec3 col = mix(vec3(0.040, 0.030, 0.082), vec3(0.028, 0.052, 0.068), clamp(0.5 + p.y * 0.04 + p.x * 0.21, 0.0, 1.0));
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(4.888, 5.854, 6.821) + fi * 0.42 + (time * 0.61) * 0.28)) * (0.0063 / (length(p - na) + 0.028));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.99){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(4.888, 5.854, 6.821) + ll * 1.44 + (time * 0.61) * 0.77)) * (0.0023 / (sd + 0.016)) * (1.0 - ll / 0.99);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.946, 0.993, 1.042);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
