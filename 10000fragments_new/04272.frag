uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.30;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.57; kp = rot2(2.24) * kp; kp *= 1.28; }
    v = sin(kp.x * 2.72 - t * 1.36 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.50;
	p = (floor(p * 10.4) + 0.5) / 10.4;
	{ p = vec2(atan(p.y, p.x) * 2.18, length(p) * 4.27 - time * 0.56); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.71 + time * 0.05, vec3(0.57, 0.54, 0.42), vec3(0.31, 0.49, 0.44), vec3(0.98, 0.94, 1.30), vec3(0.82, 0.55, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
