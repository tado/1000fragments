uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.89 - t * 8.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.83;
	p *= 1.26;
	p = rot2(0.52) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.43; p = rot2(1.86) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.18, 0.52, 0.54) * (0.20 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
