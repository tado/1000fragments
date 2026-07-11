uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.65;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.42; kp = rot2(1.63) * kp; kp *= 1.41; }
    v = sin(kp.y * 1.52 - t * 1.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.67;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.15, vec3(0.40, 0.41, 0.57), vec3(0.40, 0.46, 0.49), vec3(0.71, 1.18, 0.84), vec3(0.94, 0.68, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
