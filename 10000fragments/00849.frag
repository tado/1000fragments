uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.76 + sin(p.y * 1.53 + t * 3.57) * 2.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.40;
	p = rot2(0.40) * p;
	p *= 2.97;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.69 * p.y + time * 1.51); p.y += 0.30 / wf * cos(wf * 1.60 * p.x + time * 1.96); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.11 + time * 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
