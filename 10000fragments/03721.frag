uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.09 + sin(p.y * 2.64 + t * 4.55) * 4.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.28; p = rot2(0.36) * p; }
	p += vec2(0.84, 0.30) * sin(length(p) * 5.22 - time * 1.15) * 0.38;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.99 + time * 0.14, vec3(0.48, 0.55, 0.48), vec3(0.44, 0.47, 0.50), vec3(0.72, 0.87, 1.32), vec3(0.36, 0.87, 0.06));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
