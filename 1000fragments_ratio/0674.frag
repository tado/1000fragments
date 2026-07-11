uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.64) * (0.76 + 1.00 * h1) + fi * 2.39), cos((time * 0.64) * (0.49 + 0.99 * h2) + fi * 1.73)) * 0.93;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	if(resolution.x > resolution.y * 1.9) p = p.yx;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y += sin(p.x * 2.48 + (time * 0.64) * 0.46) * 0.16;
	p = rot2((time * 0.64) * 1.31) * p;
	vec3 col = vec3(0.032, 0.023, 0.053);
	for(int i = 0; i < 8; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.71, 3.42) + fi * 1.21 + (time * 0.64) * 0.84)) * (0.0090 / (length(p - na) + 0.020));
		for(int j = i + 1; j < 8; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.89){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.91, 0.61, 0.73) * (0.0028 / (sd + 0.009)) * (1.0 - ll / 0.89);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.18 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(0.995, 0.956, 1.026) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
