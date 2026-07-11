uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.29) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 1.60 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.33;
	p = rot2(0.49) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.70 * p.y + time * 0.75); p.y += 0.24 / wf * cos(wf * 1.56 * p.x + time * 0.74); }
	p = rot2(p.y * 2.30 + time * 0.37) * p;
	p = abs(p) - 0.28;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.64 + time * 0.07, vec3(0.59, 0.42, 0.52), vec3(0.47, 0.41, 0.40), vec3(0.90, 0.82, 1.13), vec3(0.89, 0.69, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
