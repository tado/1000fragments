uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.75 + sin(p.y * 4.79 + t * 5.84) * 3.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.44;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.11; p = rot2(2.23) * p; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.30 * p.y + time * 0.95); p.y += 0.44 / wf * cos(wf * 1.96 * p.x + time * 0.83); }
	p = rot2(length(p) * -1.58 + time * 1.19) * p;
	p = rot2(1.68) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.85 + time * 0.03);
	col = clamp((col - 0.5) * 1.34 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
