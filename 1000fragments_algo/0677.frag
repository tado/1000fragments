uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.67) * (0.39 + 1.10 * h1) + fi * 2.39), cos((time * 0.67) * (0.33 + 0.51 * h2) + fi * 1.73)) * 0.81;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.71;
	p.x += p.y * 0.63;
	p *= 1.28;
	p = rot2((time * 0.67) * 1.42) * p;
	vec3 col = vec3(0.002, 0.015, 0.012);
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.54, 1.09) + fi * 1.13 + (time * 0.67) * 0.25)) * (0.0085 / (length(p - na) + 0.014));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.99){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.80, 0.41, 0.31) * (0.0016 / (sd + 0.014)) * (1.0 - ll / 0.99);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.95 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.922, 0.994, 1.033) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
