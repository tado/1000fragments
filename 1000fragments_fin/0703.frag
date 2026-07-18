uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.69) * (0.51 + 1.07 * h1) + fi * 2.39), cos((time * 0.69) * (0.56 + 0.64 * h2) + fi * 1.73)) * 0.62;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p *= 1.50;
	p = rot2((time * 0.69) * 0.52) * p;
	vec3 col = mix(vec3(0.033, 0.029, 0.099), vec3(0.033, 0.042, 0.063), clamp(0.5 + p.y * 0.17 + p.x * 0.24, 0.0, 1.0));
	for(int i = 0; i < 7; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(4.788, 5.842, 6.896) + fi * 0.90 + (time * 0.69) * 0.44)) * (0.0091 / (length(p - na) + 0.029));
		for(int j = i + 1; j < 7; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.90){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(4.788, 5.842, 6.896) + ll * 2.87 + (time * 0.69) * 0.92)) * (0.0023 / (sd + 0.017)) * (1.0 - ll / 0.90);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.030, 0.975, 0.955);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
