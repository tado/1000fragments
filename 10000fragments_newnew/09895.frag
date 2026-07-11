uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.80;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.44; kp = rot2(1.97) * kp; kp *= 1.34; }
    v = sin(kp.x * 1.90 - t * 1.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.28;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.89 + time * 0.18, vec3(0.45, 0.53, 0.55), vec3(0.41, 0.36, 0.38), vec3(1.25, 1.26, 0.86), vec3(0.03, 0.53, 0.57));
	col *= 0.88 + 0.13 * sin(gl_FragCoord.y * 1.22 + time * 17.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
