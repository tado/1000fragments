uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.05 - t * 2.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.26;
	p *= 2.21;
	p = fract(p * 2.78) - 0.5;
	p += vec2(-0.38, 0.62) * sin(length(p) * 3.73 - time * 1.61) * 0.13;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.22; p = rot2(1.00) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.14, vec3(0.45, 0.47, 0.40), vec3(0.44, 0.45, 0.43), vec3(0.94, 0.93, 1.02), vec3(0.03, 0.69, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
