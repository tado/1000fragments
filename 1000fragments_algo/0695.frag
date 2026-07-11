uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.74) * (0.42 + 0.42 * h1) + fi * 2.39), cos((time * 0.74) * (0.46 + 0.68 * h2) + fi * 1.73)) * 0.91;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.64 + (time * 0.74) * 0.87) * 0.17;
	vec3 col = vec3(0.009, 0.013, 0.042);
	for(int i = 0; i < 7; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.54, 1.08) + fi * 0.69 + (time * 0.74) * 0.35)) * (0.0044 / (length(p - na) + 0.017));
		for(int j = i + 1; j < 7; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.79){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 0.54, 1.08) + ll * 2.06 + (time * 0.74) * 0.68)) * (0.0029 / (sd + 0.016)) * (1.0 - ll / 0.79);
			}
		}
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.65);
	col = clamp(col, 0.0, 1.0) * vec3(1.037, 0.986, 0.938) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
