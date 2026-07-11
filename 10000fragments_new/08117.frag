uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 6.36 * sin(t * 1.01) + t * 5.48 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	p = (floor(p * 7.7) + 0.5) / 7.7;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 1.87 * p.y + time * 1.02); p.y += 0.45 / wf * cos(wf * 3.86 * p.x + time * 1.41); }
	p = rot2(p.y * 2.17 + time * 0.41) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.16, vec3(0.44, 0.40, 0.41), vec3(0.45, 0.34, 0.33), vec3(1.33, 1.05, 0.83), vec3(0.65, 0.49, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
