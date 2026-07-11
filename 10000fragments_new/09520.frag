uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.99;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.68; kp = rot2(0.99) * kp; kp *= 1.43; }
    v = sin(kp.x * 3.06 - t * 4.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = (floor(p * 13.3) + 0.5) / 13.3;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.01, vec3(0.48, 0.43, 0.42), vec3(0.40, 0.41, 0.31), vec3(1.13, 1.21, 1.27), vec3(0.05, 0.67, 0.45));
	col = clamp((col - 0.5) * 1.26 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
