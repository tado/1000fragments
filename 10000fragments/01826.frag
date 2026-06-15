uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.34 + t * 2.05 + ph) + sin(p.y * 11.83 - t * 1.28 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.47;
	p = abs(p) - 0.66;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 1.97 * p.y + time * 1.46); p.y += 0.34 / wf * cos(wf * 2.54 * p.x + time * 0.63); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.34; p = rot2(2.32) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.52 + time * 0.23);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
