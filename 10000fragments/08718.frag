uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.45 + sin(p.y * 3.07 + t * 1.57) * 1.30 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.11;
	p = rot2(length(p) * 3.99 + time * 0.81) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.34; p = rot2(1.67) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.60 * p.y + time * 1.27); p.y += 0.43 / wf * cos(wf * 3.74 * p.x + time * 0.86); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.84 + time * 0.01);
	col = clamp((col - 0.5) * 1.61 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
