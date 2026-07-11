uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.57) * (0.78 + 0.53 * h1) + fi * 2.39), cos((time * 0.57) * (0.58 + 0.53 * h2) + fi * 1.73)) * 0.60;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.36 + (time * 0.57) * 0.75) * 0.16;
	p += vec2(sin((time * 0.57) * 0.96), cos((time * 0.57) * 0.40)) * 0.13;
	p *= 1.04;
	vec3 col = vec3(0.030, 0.003, 0.053);
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.55, 1.10) + fi * 0.89 + (time * 0.57) * 0.35)) * (0.0066 / (length(p - na) + 0.025));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.08){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 0.55, 1.10) + ll * 1.56 + (time * 0.57) * 0.38)) * (0.0015 / (sd + 0.020)) * (1.0 - ll / 1.08);
			}
		}
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.030, 0.974, 0.944) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
