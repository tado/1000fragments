uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.75 - t * 7.78 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.56 * p.y + time * 1.47); p.y += 0.42 / wf * cos(wf * 2.79 * p.x + time * 1.74); }
	p = fract(p * 1.61) - 0.5;
	p = rot2(time * 0.68) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.18 + time * 0.25, vec3(0.46, 0.53, 0.56), vec3(0.41, 0.34, 0.33), vec3(0.86, 0.97, 0.76), vec3(0.46, 0.82, 0.01));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
