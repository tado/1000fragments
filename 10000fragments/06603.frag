uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.97 + sr * 22.90 - t * 1.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.17; p = rot2(1.55) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 1.67 * p.y + time * 2.07); p.y += 0.39 / wf * cos(wf * 3.03 * p.x + time * 1.34); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.73 + time * 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
