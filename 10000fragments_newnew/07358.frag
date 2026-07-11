uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.93 + t * 0.91) - 0.5) * 2.0;
    v = sin((p.y * 3.97 + zx * 0.87 + t * 2.28) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.53;
	p = abs(p) - 0.74;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.19; p = rot2(2.04) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.58, 0.91, 0.71) * (0.12 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = fract(col * 2.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
