uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.66 - t * 2.60 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.70 + t * 2.21 + ph) + sin(p.y * 17.35 - t * 5.12 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	p = rot2(length(p) * -2.85 + time * 0.43) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.36 * p.y + time * 1.89); p.y += 0.24 / wf * cos(wf * 3.43 * p.x + time * 1.59); }
	p = fract(p * 1.38) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.42);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.79 + time * 0.04, vec3(0.58, 0.53, 0.43), vec3(0.35, 0.38, 0.49), vec3(1.01, 1.35, 1.26), vec3(0.97, 0.70, 0.30));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
