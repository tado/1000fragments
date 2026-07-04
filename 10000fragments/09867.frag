uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.25;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.60; kp = rot2(1.58) * kp; kp *= 1.39; }
    v = sin(kp.y * 1.38 - t * 2.46 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.62;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.78, 0.88, 0.93) + vec3(0.21, 0.12, 0.03);
	col = clamp((col - 0.5) * 1.96 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
