uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.66 + 0.96 * h1) + fi * 2.39), cos(time * (0.76 + 0.95 * h2) + fi * 1.73)) * 0.87;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.036, 0.011, 0.048);
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.98 + time * 0.50)) * (0.0104 / (length(p - na) + 0.013));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.08){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ll * 1.63 + time * 0.53)) * (0.0027 / (sd + 0.018)) * (1.0 - ll / 1.08);
			}
		}
	}
	col = col / (1.0 + col);
	col = mod(col * 2.45, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
