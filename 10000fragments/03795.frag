uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.97;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.56; kp = rot2(0.64) * kp; kp *= 1.28; }
    v = sin(kp.x * 1.58 - t * 2.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.27, vec3(0.57, 0.48, 0.46), vec3(0.46, 0.45, 0.43), vec3(0.73, 1.25, 1.26), vec3(0.52, 0.72, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
