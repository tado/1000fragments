uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.24;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.67; kp = rot2(2.21) * kp; kp *= 1.40; }
    v = sin(kp.x * 1.63 - t * 2.75 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	p.y += sin(p.x * 4.32 + time * 2.33) * 0.19;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.22, 1.28, 0.76) + vec3(0.12, 0.08, 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
