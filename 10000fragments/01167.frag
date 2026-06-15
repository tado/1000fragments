uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.31 + sin(p.y * 4.03 + t * 2.96) * 4.96 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.59;
	p = fract(p * 2.75) - 0.5;
	p = rot2(p.y * -3.32 + time * 0.96) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.13; p = rot2(0.51) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.18 + time * 0.24, vec3(0.43, 0.48, 0.43), vec3(0.37, 0.39, 0.31), vec3(0.91, 0.82, 1.15), vec3(0.97, 0.86, 0.53));
	col = mod(col * 2.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
