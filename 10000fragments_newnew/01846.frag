uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.79 + 0.61 * h1) + fi * 2.39), cos(time * (0.52 + 1.06 * h2) + fi * 1.73)) * 0.64;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	vec3 col = vec3(0.009, 0.012, 0.010);
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.43 + time * 0.27)) * (0.0119 / (length(p - na) + 0.019));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.01){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.96, 0.91, 0.33) * (0.0023 / (sd + 0.020)) * (1.0 - ll / 1.01);
			}
		}
	}
	col = col / (1.0 + col);
	col *= 0.85 + 0.12 * sin(gl_FragCoord.y * 1.65 + time * 17.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
