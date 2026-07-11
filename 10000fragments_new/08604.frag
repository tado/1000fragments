uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.42;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.61; kp = rot2(2.00) * kp; kp *= 1.44; }
    v = sin(kp.x * 2.47 - t * 4.36 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.93 + 0.46 * sin(t * 0.66)) + vec2(-0.69, 0.25) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 28; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 28.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.10;
	p = fract(p * 2.46) - 0.5;
	p = abs(p) - 0.56;
	p = rot2(1.30) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.95);
	float d = d1 + d2;
	vec3 col = palette(d * 0.64 + time * 0.07, vec3(0.41, 0.42, 0.49), vec3(0.32, 0.35, 0.44), vec3(1.09, 0.75, 1.08), vec3(0.12, 0.76, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
